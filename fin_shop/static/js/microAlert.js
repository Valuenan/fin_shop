function microAlert(e,i,t){var o=i||3e3,r=$.extend(!0,{css:{},id:null},t),c=(new Date).getTime();$(".micro-alert").length||$("body").append($("<div>",{class:"micro-alert"})),$container=$(".micro-alert");var a="id-micro-alert"+c,n=$("<div>",{class:"micro-alert-item "+a,css:r.css});"string"==typeof r.modificator&&n.addClass("is-"+r.modificator),n.on("click",function(){$(this).remove()}),n.html(e),$container.append(n),setTimeout(function(){$("."+a).remove()},o)}
