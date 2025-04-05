// ==UserScript==
// @name         MWI QoL Skill requirement
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Tools for MilkyWayIdle. Highlights equipment, tool, and ability level requirements in color.
// @author       AlexZaw
// @license      MIT License
// @match        https://www.milkywayidle.com/*
// @match        https://test.milkywayidle.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";

  const RequiredLevelItemStyle = document.createElement("style");
  RequiredLevelItemStyle.textContent = `
  :where(.ItemTooltipText_itemTooltipText__zFq3A :where(.ItemTooltipText_equipmentDetail__3sIHT, .ItemTooltipText_abilityDetail__3ZiU5)) > div:nth-child(2) {
    color: blue;
  }
`;
  document.head.appendChild(RequiredLevelItemStyle);

  new MutationObserver(waitItemInfoPopup).observe(document.body, {
    childList: true,
  });

  function waitItemInfoPopup(changes, observer) {
    if (document.querySelector(".MuiTooltip-popper")) {
      getItemRequirements();
    }
  }

  function getItemRequirements() {
    const toolTipText = document.querySelector(
      ".ItemTooltipText_itemTooltipText__zFq3A"
    );
    try {
      const detail =
        toolTipText.querySelector(".ItemTooltipText_equipmentDetail__3sIHT") ||
        toolTipText.querySelector(".ItemTooltipText_abilityDetail__3ZiU5");
      const itemRequirementsElems =
        detail.querySelector(":nth-child(2)").children;
      const itemRequirementsArr = [];
      [...itemRequirementsElems].forEach((el) => {
        itemRequirementsArr.push(el.textContent.split(" "));
      });
      return itemRequirementsArr;
    } catch (error) {
      return false;
    }
  }
})();

function isLevelEnough(skill, requiredLevel) {
  try {
    const allSkills = getAllSkillLevels();
    allSkills.forEach((el) => {
      if (el.textContent == skill) {
        const currentLevel = Number(
          el.parentElement.querySelector(".NavigationBar_level__3C7eR")
            .textContent
        );
        if (currentLevel >= requiredLevel) {
          return true;
        }

        return false;
      }
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}

function getAllSkillLevels() {
  return document
    .querySelector(".NavigationBar_navigationLinks__1XSSb")
    .querySelectorAll(".NavigationBar_label__1uH-y");
}
