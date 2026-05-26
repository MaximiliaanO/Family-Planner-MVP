import type { FamilyMember } from "../utils/getData";

export default function PersonCircleSmall({ member }: {member : FamilyMember}) {

    return (
        <div className={`mr-1 mt-0.5 rounded-full w-5 h-5 flex justify-center items-center ${member.accentColor} shadow-sm`}>
            <p className={` ${member.fontColor}`}>{member.first_name[0]}</p>
        </div>
    )
}