class Jareth{
    constructor(){
        this.thisMakesJarethAngry = (/cunt/gi);
        this.body = document.getElementsByTagName("body")[0];
        let replacements = [];
        this.search(this.body, this.body.children, replacements);

        for(let r=0; r < replacements.length; r++){
            let rep = replacements[r];
            rep.element.replaceChild(rep.fragment, rep.node);
        }

        let jareths = document.getElementsByTagName("SPAN");
        for(let e of jareths){
            if(e.matches(".angry-jareth")){
                let position = e.getBoundingClientRect();
                let jareth = document.createElement("DIV");
                jareth.setAttribute("style",
                    `top:${position.top-20}px;left:${position.left-225}px;position:absolute;z-index:999999;height:586px;width:450px;background:url(./jareth.png) top left no-repeat`);
                this.body.appendChild(jareth);
            }
        }

        replacements = null;
    }

    search(parent, elementList, replacements){
        for(let e of elementList){
            if(e.nodeName === "#text"){
                let remaining = e.textContent;
                let index = remaining.search(this.thisMakesJarethAngry);
                if(index >= 0){
                    let fragment = document.createDocumentFragment();
                    while(index >= 0){
                        /* We found something */
                        let before = remaining.substr(0, index);
                        if(before.length > 0 ) fragment.appendChild(document.createTextNode(before));
                        let found = remaining.substr(index, 4);
                        if(found.length > 0){
                            let span = document.createElement('span');
                            span.setAttribute('class', 'angry-jareth');
                            span.setAttribute('style', 'position: relative; background: yellow');
                            span.appendChild(document.createTextNode(found));
                            fragment.appendChild(span);
                        }
                        remaining = remaining.substr(index + 4);
                        index = remaining.search(this.thisMakesJarethAngry);
                    }
                    if(remaining.length > 0){
                        fragment.appendChild(document.createTextNode(remaining));
                    }
                    replacements.push({'element': parent, 'node': e, 'fragment': fragment});
                }
            }else if(e.matches(".angry-jareth") || e.tagName === "SCRIPT" || e.tagName === "IMG" || e.tagName === "AUDIO"){
                //No-OP
            }else{
                this.search(e, e.childNodes, replacements);
            }
        }
    }
}

const jarethDeployer = new Jareth();
