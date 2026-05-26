import { accentColors, backgroundColors, fontColors, backgroundColorsOpaque } from "../constants/CalendarConstants";
import type { FamilyMember } from "./getData";

function addColorsToFamilyMembers (familyMembers : FamilyMember[]) {
    let i = 0
    while (i < familyMembers.length) {
        const modulo = i % backgroundColors.length
        familyMembers[i]["bgColor"] = backgroundColors[modulo]
        familyMembers[i]["fontColor"] = fontColors[modulo]
        familyMembers[i]["accentColor"] = accentColors[modulo]
        familyMembers[i]["backgroundColorsOpaque"] = backgroundColorsOpaque[modulo]

        i++
    }
    return familyMembers
}

export {
    addColorsToFamilyMembers
}