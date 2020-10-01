class Jareth{
                constructor(){
                    this.jarethStyle = {
                        position: 'absolute',
                        zIndex: 999999,
                        height: 586,
                        width: 450,
                        background: 'url(./jareth.jpg) top left no-repeat'
                    };
                    this.thisMakesJarethAngry = (/cunt/gi);
                    this.elementsArray = [].concat(
                        document.getElementsByTagName('span'),
                        document.getElementsByTagName('h1'),
                        document.getElementsByTagName('h2'),
                        document.getElementsByTagName('h3'),
                        document.getElementsByTagName('h4'),
                        document.getElementsByTagName('h5'),
                        document.getElementsByTagName('p'),
                        document.getElementsByTagName('a'),
                        document.getElementsByTagName('li'));
                }

                triggerJareth(){
                    let replacements = new Array();
                    for(let i=0; i< this.elementsArray.length; i++){
                        for(let j=0; j < this.elementsArray[i].length; j++){
                            let element = this.elementsArray[i][j];
                            let kids = element.childNodes;
                            for(let k=0; k < kids.length; k++){
                                let kid = kids[k];
                                if(kid.nodeName === '#text'){
                                    let remaining = kid.nodeValue;
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
                                                span.setAttribute('class', 'jareth');
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
                                        replacements.push({'element': element, 'node': kid, 'fragment': fragment});
                                    }
                                }
                            }
                        }
                    }

                    for(let r=0; r < replacements.length; r++){
                        let rep = replacements[r];
                        rep.element.replaceChild(rep.fragment, rep.node);
                    }

                    let jareths = $("span.jareth");
                    let body = $("body");
                    jareths.each(function(i, e){
                        let $e = $(e);
                        let xy = $e.position();
                        let jareth = $('<div>');
                        jareth.css(this.jarethStyle);
                        body.append(jareth);
                        jareth.css("top", xy.top-30).css("left", xy.left-220);
                    }.bind(this));

                    replacements = null;
                }
            }

            const jarethDeployer = new Jareth();
            jarethDeployer.triggerJareth();
