function Bubble( opts ) {
    var self = this,
        fields = document.querySelectorAll( opts.fields ),
        isOpenList = false;   

    function create( el, txt, str ) {
        var wrap = document.createElement('div'),
            item = document.createElement('span');
        wrap.className = 'bubble__wrap';
        if ( isValid( str ) == true ) {
            item.className = 'bubble__wrap__item';
        } else {
            item.className = 'bubble__wrap__item error';
        }
        item.appendChild( document.createTextNode( txt ) );
        wrap.appendChild( item );
        el.parentNode.insertBefore( wrap, el );
    }
    
    function isVal( fields ) {
        return fields.value;
    }
    
    function isValid( str ) {
        var regexp = /^[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
        if ( regexp.test( str ) ) {
            return true;
        } else {
            return false;
        }
    }
    
    function getListPosLeft( el ) {
        return parseFloat( el.offsetLeft );
    }
    
    this.clean = function ( fields ) {
        fields.value = '';
    }
    
    this.del = function( par ) {
        var wrap = par.querySelectorAll( '.bubble__wrap' );
        if ( wrap.length > 0) {
            var  size = wrap.length,
                el = wrap[size - 1];
                el.parentNode.removeChild( el );
                size -=  1;
        }
    }

    
    function listOpen( el ) {
        var list = el.parentNode.getElementsByClassName( 'js_bubble_list' ),
            left = getListPosLeft( el ) + 'px';
        list[0].style.display = 'block';
        list[0].style.left = left;
        
        isOpenList = true;
    }
    
    function listClose( el ) {
        var list = el.parentNode.getElementsByClassName( 'js_bubble_list' );
        list[0].style.display = 'none';
    }

    for ( var c = 0; c < fields.length; c++ ) {
        var curr = fields[c];
        
        curr.onkeyup = function(){
            var txt = isVal( this ),
                _this = this;
            if ( txt ) {
                listOpen( this );
                window.onclick = function( e ) {
                    var e = window.e || e, 
                        obj = e.target || e.srcElement; 
                    if ( obj.className == 'bubble__list__item' ) {
                        create( _this, obj.firstChild.nodeValue, obj.firstChild.nodeValue );
                        self.clean( _this );
                        _this.focus();
                        listClose( _this );
                        
                    } else {
                        listClose( _this );
                        return false;
                    }
                }
            }
        }
        
        curr.onkeydown = function( e ) {
            var keycode =  e.keyCode ? e.keyCode : e.which,
                parent = this.parentNode;
            if ( isVal( this ) == '' ) {
                if ( keycode == 8 ) {
                    self.del( parent );
                    return false;
                }
                if ( keycode == 27 ) {
                    self.del( parent );
                    return false;
                }
            }
        }
    }

   
}

window.onload = function() {
    var bubble = new Bubble({
        fields: '.js_bubble'
    });
}


