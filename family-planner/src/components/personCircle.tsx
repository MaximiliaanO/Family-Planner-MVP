import type { FamilyMember } from "../utils/getData";

export default function PersonCircle({ member }: {member : FamilyMember}) {

    return (
        <div className={`ml-2 rounded-full w-13 h-13 flex justify-center items-center ${member.accentColor} shadow-sm`}>
            <p className={` ${member.fontColor}`}>{member.first_name[0]}</p>
        </div>
    )
}