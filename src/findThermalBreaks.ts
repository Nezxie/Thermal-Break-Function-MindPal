type Rail = { 
    x1: number; 
    x2: number; 
    y: number; 
    type: 'rail' 
};

type OtherRailElement = { 
    x: number; 
    y: number; 
    type: 'other' 
};

type Coordinate = {
    x: number;
    y: number;
}

export type Segment = Rail | OtherRailElement;

const MAX_LENGTH = 500;

export default function findThermalBreaks(input:Segment[]):Coordinate[]{
   
    const breaksCordinates:Coordinate[] = [];
    let filteredRails = input.filter(rail=>rail.type!=="other") //.sort((a, b) => a.y - b.y);
    const groupedRails = Object.groupBy(filteredRails, ({ y }) => y);
    for (const y in groupedRails) {

        let length = 0;
        let prev_x2:null|number = null;
        
        console.log("\n===================")
        console.log("New y: ",y);
        console.log("===================")

        groupedRails[y]?.map((rail)=>{
            let segmentLength = rail.x2-rail.x1;
            
            if(prev_x2!==null && (Math.abs(prev_x2 - rail.x1) > 1e-6) ){
                length = 0;
            }

            if(prev_x2!==null && length + segmentLength > MAX_LENGTH){
                breaksCordinates.push({
                    'x':prev_x2,
                    'y':Number(y)
                })
                length = 0;
            }
            
            length += segmentLength;
            
            console.log(`prev_x2 = ${prev_x2} x1 = ${rail.x1}, x2 = ${rail.x2}, l = ${segmentLength}`);
            console.log("is continuous: ",length + segmentLength > MAX_LENGTH)
            console.log("length after: ",length)
            console.log("____________________ \n")

            prev_x2 = rail.x2;
        })
    }
    console.log(breaksCordinates)
    return breaksCordinates;
}
