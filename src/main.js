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
})();
