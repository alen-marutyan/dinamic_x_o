const game = document.querySelector('.game');
const modalCount = document.querySelector('.modalCount');
let modal = document.querySelector('.modal')
let gameover_audio = document.querySelector('.gameover_audio')
let click_audio = document.querySelector('.click_audio');
let btn_restart = document.querySelector('.btn-restart');
let btn_quit = document.querySelector('.btn-quit');
let textModal = document.querySelector('.modal h2')


const send = document.querySelector('#send');

send.addEventListener('click', ()=>{
    const count = document.querySelector('#count').value
    let arr = [];
    if(+count >= 3 && +count <= 10) {
        modalCount.style.display = 'none'
        game.style.display = 'flex'
        
    
        for(let i = 0; i < count; i++) {
            let tr = document.createElement('div');
            tr.classList.add('tr');
            game.appendChild(tr);
            arr[i] = [];
    
            for(let j = 0; j < count; j++) {
                let td = document.createElement('div');
                td.setAttribute('data-src',i + '-' + j)
                td.classList.add('td');
                tr.appendChild(td);
                arr[i].push('_');
            }
        }


        let countPlayer = 0;

        game.addEventListener('click',(e)=>{
            click_audio.play();
            let index = e.target.getAttribute('data-src').split('-')
            console.log(index);

            if (e.target.innerHTML === 'X' || e.target.innerHTML === 'O'){
                return
            }

            if (countPlayer % 2 === 0) {
                arr[index[0]][index[1]] = 'X'
                e.target.innerHTML = 'X'
            }else {
                arr[index[0]][index[1]] = 'O'
                e.target.innerHTML = 'O'
            }

            countPlayer++;
            console.log(arr)


            let countRowX = 0;
            let countColumnX = 0;
            let countRowO = 0;
            let countColumnO = 0;
            let diagonalLeftX =0
            let diagonalLeftO =0
            let diagonalRightX =0
            let diagonalRightO =0
            let drawCount = 0;


            for (let i = 0; i < count; i++) {

                // diagona lLeft - X

                if (arr[i][i] === 'X'){
                    diagonalLeftX++
                    if (diagonalLeftX == count){
                        Win('X')
                    }
                }

                // diagona lLeft - O

                if (arr[i][i] === 'O'){
                    diagonalLeftO++
                    if (diagonalLeftO == count){
                        Win()
                    }

                }

                // diagona Right - X

                if (arr[i][(count-1)-i] === 'X'){
                    diagonalRightX++
                    if (diagonalRightX === +count){
                        Win('X')
                    }
                }

                // diagona Right - O

                console.log((count-1)-i)

                if (arr[i][(count-1)-i]  === 'O'){
                    diagonalRightO++
                    if (diagonalRightO === +count){
                        Win()
                    }

                }


                countRowX = 0;
                countColumnX = 0;
                countRowO = 0;
                countColumnO = 0;



                for (let j = 0; j < count; j++) {


                    // Row - X

                    if (arr[i][j] === 'X'){
                        countRowX++
                        if (countRowX == count){
                            Win('X')
                        }
                    }

                    // Row - O

                    if (arr[i][j] === 'O'){
                        countRowO++
                        if (countRowO == count){
                            Win()
                        }

                    }

                    // Column - X

                    if (arr[j][i] === 'X'){
                        countColumnX++
                        if (countColumnX == count){
                            Win('X')
                        }
                    }

                    // Column - O

                    if (arr[j][i] === 'O'){
                        countColumnO++
                        if (countColumnO == count){
                            Win()
                        }

                    }

                //    full

                }

                arr[i].forEach(value=>{
                    if (value != '_'){
                        drawCount++
                    }
                })
                console.log(drawCount)
                if (drawCount == count*count){
                    textModal.innerHTML = 'The game ended in a draw'
                    gameover_audio.play();
                    game.style.display = 'none'
                    modal.classList.add('active')
                }

            }


        })


    
    }

    btn_restart.addEventListener('click', gameRestart);
    btn_quit.addEventListener('click', gameQuit);

});

function gameRestart(){
    location.reload()
}

function gameQuit(){
    window.close();
}

function Win(value){

    if(value === 'X'){
        textModal.innerHTML = 'Winner Is X '
    }else{
        textModal.innerHTML = 'Winner Is O '
    }

    gameover_audio.play();
    game.style.display = 'none'
    modal.classList.add('active')
}