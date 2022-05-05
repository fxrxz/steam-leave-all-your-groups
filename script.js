// ==UserScript==
// @name         Leave all groups on from your groups page
// @namespace    https://github.com/fxrxz
// @version      0.1
// @description  Leave all your steam groups at once
// @author       fxrxz
// @match        *://steamcommunity.com/id/*/groups/
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @grant        none
// ==/UserScript==

function LeaveGroups() {

  const groupIdsList = [];
  const leaveGroupBtns = document.querySelectorAll(
    'a.linkStandard.btnv6_blue_hoverfade.btn_small_tall'
  );
  // Collect all groupIDs from the 'Leave Group' button's onclick attribute
  leaveGroupBtns.forEach(a => {
    groupIdsList.push(/(?:\d{10,20})/gm.exec(a.attributes.onclick.nodeValue)[0]);
  });
  groupIdsList.forEach(groupId => {
    const params = {
      sessionid: g_sessionID,
      steamid: g_steamID,
      ajax: 1,
      action: 'leave_group',
      steamids: [groupId],
    };
    $.ajax({
      url: g_rgProfileData.url + 'friends/action',
      data: params,
      type: 'POST',
      dataType: 'json',
    })
      .done(function (data) {
        console.log('[Auto-Group-Leaver] Left Group.');
      })
      .fail(function () {
        console.log(
          '[Auto-Group-Leaver] Error processing your request. Please try again.'
        );
      });
  });
}

// Start leave process
const steamid = g_rgProfileData.steamid;
if (g_steamID === steamid) {
  LeaveGroups();
}
