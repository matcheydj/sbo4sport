(function(){"use strict";function l(u,s,e){var x=new XMLHttpRequest();x.open("GET",u,true);x.onreadystatechange=function(){if(this.readyState!==4){return}if(this.status===200){s(x.responseText)}else{e(x.responseText)}};x.send()}self.onmessage=function(e){if(e.data.action){switch(e.data.action){case'loadResource':l(e.data.url,function(r){self.postMessage(r)},function(m){self.postMessage({error:m})});break}}}}());
