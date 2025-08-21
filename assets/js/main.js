/*
 *   for some reason the code below doesnt work,,
 * 
 *
 *    document.addEventListener('contextmenu', (e) => {
 *        e.preventDefault();
 *    });                                                                         // Disable right click
 *
 *    document.addEventListener('keydown', (e) => {
 *        if (e.code === 'F12') {
 *            e.preventDefault();
 *        }
 *
 *        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'I' || e.key === 'C' )) {
 *            e.preventDefault();
 *        }
 *      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'u')) {
 *          e.preventDefault();
 *        }
 *    });                                                                         // Disable keyboards shortcut/combinations
 */
let nID;
// block users from using right click, keyboard shortcuts
/*document.addEventListener('contextmenu', (e) => e.preventDefault());
        function ctrlShiftKey(e, keyCode) {
return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);}
        document.onkeydown = (e) => {
    if (event.keyCode === 123 || ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') || ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)))
    return false;};*/

// main script start here

// open apps upon icon click
const appGrid = document.getElementsByClassName('icon-grid');
let appID;
appGrid[0].addEventListener('click', function(event) {
        const clickedIcon = event.target.closest('.icon')
        if (clickedIcon) {
                appID = clickedIcon.id;
                launchApp(appID);
        }
});

const tripmine = document.getElementById('tripmine')
// app launcher </3
function launchApp(aID) {
        switch (aID) {
        case 'about':
                console.log('opened 1');
                nID = document.getElementById(aID.concat('App'));
                nID.style.display = "flex";
                nID.style.zIndex = "1"
                loadContent(aID);
                break;
        
        case 'connections':
                console.log('opened 2')
                nID = document.getElementById(aID.concat('App'));
                nID.style.display = "flex";
                nID.style.zIndex = "2"
                loadContent(aID);
                break;

        case 'winamp':
                console.log('opened 3');
                winamp();
                break;

        case 'virus':
                console.log('opened 4');
                nID = document.getElementById(aID.concat('App'));
                nID.style.display = "contents";
                nID.style.zIndex = "1";
                if (tripmine.paused) {
                        tripmine.play();
                }
                virusApp();
                break;

        case 'yumenikki':
                console.log('opened 5');
                nID = document.getElementById('game');
                nID.style.display = "flex";
                nID.style.zIndex = "3";
                loadGame();
                break;
        
        case 'readme':
                console.log('opened 6');
                nID = document.getElementById(aID.concat('App'));
                nID.style.display = "flex";
                nID.style.zIndex = "4"
                loadContent(aID);
                break;

        case 'cat':
                console.log('opened 7');
                nID = document.getElementById(aID.concat('App'));
                nID.style.display = "flex";
                nID.style.zIndex = "5";
                loadContent(aID);

        }
}


// close apps
const closeBtn = document.querySelectorAll('.close');
closeBtn.forEach(btn => {
        btn.addEventListener('click', function(event) {
        nID = event.target.parentNode.parentNode;
        nID.style.display = "none"
})});

const gClose = document.getElementById('gameClose')
const gContent = document.getElementById('gameContent')
gClose.addEventListener('click', function(event) {
        gContent.innerHTML = ''
})

// let users drag and resize some particular apps
class dynamicwindows {
        //adding parameters
        constructor(divs) {
                //find the windows (divs)
                this.frame = divs;
                
                //let the class finds the handle and resize borders
                this.handle = this.frame.querySelector('.handle');

                //variables for the states
                this.isDragging = false;
                this.isResizing = false;
                this.currentHandle = null;

                //initial position and size
                this.iniX = 0;
                this.iniY = 0;
                this.iniL = 0;
                this.iniT = 0;
                this.iniW = 0;
                this.iniH = 0;

                this.borderThreshold = 8;
                
                this.attachEventListener();
        }

        attachEventListener() {
                //setting the windows' positions to absolute
                if (window.getComputedStyle(this.frame).position !== 'absolute') {
                        this.frame.style.position = 'absolute';
                }

                //dragging listener
                if (this.handle) {
                        this.handle.addEventListener('mousedown', this.drag.bind(this));
                        this.handle.addEventListener('touchstart', this.drag.bind(this));
                }
                
                //resizing listener
                this.frame.addEventListener('mousemove', this.setResizeCursor.bind(this));
                this.frame.addEventListener('mousedown', this.startResizeCheck.bind(this));
                this.frame.addEventListener('touchstart', this.startResizeCheck.bind(this));
        }

        drag(e) {
                this.isDragging = true;
                this.iniX = e.clientX || e.touches[0].clientX
                this.iniY = e.clientY || e.touches[0].clientY

                //add relative position
                this.iniL = this.frame.offsetLeft
                this.iniT = this.frame.offsetTop

                document.addEventListener('mousemove', this.doDragBound = this.doDrag.bind(this));
                document.addEventListener('mouseup', this.stopDragBound = this.stopDrag.bind(this));
                document.addEventListener('touchmove', this.doDragBound);
                document.addEventListener('touchend', this.stopDragBound);
                e.preventDefault()
        }

        doDrag(e) {
                if (!this.isDragging) return;

                const currentX = e.clientX || e.touches[0].clientX;
                const currentY = e.clientY || e.touches[0].clientY;

                const newLeft = this.iniL + (currentX - this.iniX);
                const newTop = this.iniT + (currentY - this.iniY);

                this.frame.style.left = `${newLeft}px`;
                this.frame.style.top = `${newTop}px`;             
        }

        stopDrag() {
                this.isDragging = false;
                document.removeEventListener('mousemove', this.doDragBound);
                document.removeEventListener('mouseup', this.stopDragBound);
                document.removeEventListener('touchmove', this.doDragBound);
                document.removeEventListener('touchend', this.stopDragBound);
        }

        getHandleType(e) {
                const rect = this.frame.getBoundingClientRect();
                const clientX = e.clientX || e.touches[0].clientX;
                const clientY = e.clientY || e.touches[0].clientY;

                const x = clientX - rect.left; // X position relative to the element
                const y = clientY - rect.top;  // Y position relative to the element

                const threshold = this.borderThreshold;

                const isTop = y < threshold;
                const isBottom = y > rect.height - threshold;
                const isLeft = x < threshold;
                const isRight = x > rect.width - threshold;

                if (isTop && isLeft) return 'tl';
                if (isTop && isRight) return 'tr';
                if (isBottom && isLeft) return 'bl';
                if (isBottom && isRight) return 'br';
                if (isTop) return 't';
                if (isBottom) return 'b';
                if (isLeft) return 'l';
                if (isRight) return 'r';

                return null;
        }


        setResizeCursor(e) {
                // If currently dragging or resizing, don't change the cursor
                if (this.isDragging || this.isResizing) return;

                const handleType = this.getHandleType(e);
                switch (handleType) {
                    case 'tl': case 'br': this.frame.style.cursor = 'nwse-resize'; break;
                    case 'tr': case 'bl': this.frame.style.cursor = 'nesw-resize'; break;
                    case 't': case 'b': this.frame.style.cursor = 'ns-resize'; break;
                    case 'l': case 'r': this.frame.style.cursor = 'ew-resize'; break;
                    default:
                        // Only reset cursor to default if not over the drag handle
                        if (!e.target.closest('.handle')) {
                            this.frame.style.cursor = 'default';
                        }
                }
        }

        startResizeCheck(e) {
                // If the click originated from the drag handle or close button, don't start resize
                if (e.target.closest('.handle') || e.target.closest('.close')) {
                    return;
                }

                this.currentHandle = this.getHandleType(e);
                if (this.currentHandle) {
                    this.startResize(e); // Proceed with resize if a handle type is detected
                }
        }


        startResize(e) {
                this.isResizing = true;
                // this.currentHandle is already set by startResizeCheck

                this.iniX = e.clientX || e.touches[0].clientX;
                this.iniY = e.clientY || e.touches[0].clientY;

                this.iniL = this.frame.offsetLeft;
                this.iniT = this.frame.offsetTop;
                this.iniW = this.frame.offsetWidth;
                this.iniH = this.frame.offsetHeight;

                document.addEventListener('mousemove', this.doResizeBound = this.doResize.bind(this));
                document.addEventListener('mouseup', this.stopResizeBound = this.stopResize.bind(this));
                document.addEventListener('touchmove', this.doResizeBound);
                document.addEventListener('touchend', this.stopResizeBound);

                e.preventDefault();
        }

        doResize(e) {
                if (!this.isResizing) return;

                const currentX = e.clientX || e.touches[0].clientX;
                const currentY = e.clientY || e.touches[0].clientY;

                const deltaX = currentX - this.iniX;
                const deltaY = currentY - this.iniY;

                let newWidth = this.iniW;
                let newHeight = this.iniH;
                let newLeft = this.iniL;
                let newTop = this.iniT;

                // Logic for each resize handle
                switch (this.currentHandle) {
                    case 'tl': // Top-Left
                        newWidth = this.iniW - deltaX;
                        newHeight = this.iniH - deltaY;
                        newLeft = this.iniL + deltaX;
                        newTop = this.iniT + deltaY;
                        break;
                    case 'tr': // Top-Right
                        newWidth = this.iniW + deltaX;
                        newHeight = this.iniH - deltaY;
                        newTop = this.iniT + deltaY;
                        break;
                    case 'bl': // Bottom-Left
                        newWidth = this.iniW - deltaX;
                        newHeight = this.iniH + deltaY;
                        newLeft = this.iniL + deltaX;
                        break;
                    case 'br': // Bottom-Right
                        newWidth = this.iniW + deltaX;
                        newHeight = this.iniH + deltaY;
                        break;
                    case 't': // Top
                        newHeight = this.iniH - deltaY;
                        newTop = this.iniT + deltaY;
                        break;
                    case 'b': // Bottom
                        newHeight = this.iniH + deltaY;
                        break;
                    case 'l': // Left
                        newWidth = this.iniW - deltaX;
                        newLeft = this.iniL + deltaX;
                        break;
                    case 'r': // Right
                        newWidth = this.iniW + deltaX;
                        break;
                }

                // Apply minimum dimensions (from CSS min-width/min-height)
                const minWidth = parseFloat(getComputedStyle(this.frame).minWidth);
                const minHeight = parseFloat(getComputedStyle(this.frame).minHeight);

                if (newWidth >= minWidth) {
                    this.frame.style.width = `${newWidth}px`;
                    if (['tl', 'bl', 'l'].includes(this.currentHandle)) {
                        this.frame.style.left = `${newLeft}px`;
                    }
                }
                if (newHeight >= minHeight) {
                    this.frame.style.height = `${newHeight}px`;
                    if (['tl', 'tr', 't'].includes(this.currentHandle)) {
                        this.frame.style.top = `${newTop}px`;
                    }
                }
        }

        stopResize() {
                this.isResizing = false;
                this.currentHandle = null;
                document.removeEventListener('mousemove', this.doResizeBound);
                document.removeEventListener('mouseup', this.stopResizeBound);
                document.removeEventListener('touchmove', this.doResizeBound);
                document.removeEventListener('touchend', this.stopResizeBound);
        }
}

// apply the drag and resize functions
const appDivs = document.querySelectorAll('.apps');
appDivs.forEach(div => {
        new dynamicwindows(div);
});

// calling webamp
async function winamp() {
        const waModule = await import('./webamp.mjs');
        const Webamp = waModule.default;
        const webamp = new Webamp({
                initialTracks: [
                        {       
                        metaData: {
                                artist: "Miracle Musical",
                                title: "Candle on the Water",
                        },
                        url: "/assets/media/song2.mp3",
                        }],

                initialSkin: {
                        url: "/assets/winampskin.wsz"
                },
                        
                });
        webamp.renderWhenReady(document.getElementById("winampApp"))
}

// calling virus
function virusApp() {
        const imgRan = document.getElementById('payload');
        const number = Math.floor(Math.random() * 15) + 1;
        const imgsrc = `/assets/media/v${number}.jpg`;
        imgRan.src = imgsrc;
}

// load apps' content
const contentArea = document.querySelectorAll('.content');
const loadContent = async (icoID) => {
        const contentLocate =  `/assets/sub-html/${icoID}.html`
        const response = await fetch(contentLocate)
        const contentLoad = await response.text()

        contentArea.forEach(area => {
                if (area.parentNode.id == `${icoID}App`) {
                        area.innerHTML = contentLoad
                }
        })

}

const loadGame = async () => {
        const containerContent = document.getElementById('gameContent')
        if (containerContent) {
                const iframe = document.createElement('iframe')
                iframe.style.width = '100%'
                iframe.style.height = '100%'
                iframe.style.border = 'none'

                iframe.src = 'assets/yumenikki/index.html'
                containerContent.appendChild(iframe)
        }
}       