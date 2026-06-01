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
    const filteredRails = input.filter((rail): rail is Rail => rail.type === "rail");
    const groupedRails = Object.groupBy(filteredRails, ({ y }) => y);

    for (const y in groupedRails) {
        const rails = groupedRails[y]?.sort((a, b) => a.x1 - b.x1);
        let length = 0;
        let prev_x2:null|number = null;

        rails?.forEach((rail)=>{
            let segmentLength = rail.x2-rail.x1;
            let isContinous = prev_x2!==null && (Math.abs(prev_x2 - rail.x1) <= 1e-6);
            
            if(!isContinous){
                length = 0;
            }

            if(isContinous && length + segmentLength > MAX_LENGTH){
                breaksCordinates.push({
                    'x':prev_x2!,
                    'y':Number(y)
                })
                length = 0;
            }
            
            length += segmentLength;
            prev_x2 = rail.x2;
        })
    }
    return breaksCordinates;
}
