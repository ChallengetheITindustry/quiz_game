'use strict';

{

    // 問題、回答、正解を定義
    const quiz = [

        {
            questions: "三項演算子の書き方として正しいのはどれか？",
            answers: [
                'hp > 10 ? "勇者のHPは10より大きいです" : "勇者のHPは10以下です"',
                'hp > 10 ! "勇者のHPは10より大きいです" : "勇者のHPは10以下です"',
                'hp > 10 ? "勇者のHPは10以下です" : "勇者のHPは10より大きいです"',
                '"勇者のHPは10以下です" : "勇者のHPは10より大きいです" ? hp > 10'
            ],
            correct: 'hp > 10 ? "勇者のHPは10より大きいです" : "勇者のHPは10以下です"',
            hint: '条件式(true or false) ? trueの時に行いたい処理 : falseの時に行いたい処理'
        },

        {
            questions: `numbers.each.◯_index(1) {|number| puts number}` + `-インデックスの開始番号を指定する場合、◯に入る単語はどれか`,
            answers: [
                'add',
                'push',
                'with',
                'index'
            ],
            correct: 'with',
            hint: 'マッチングアプリの名前になってます笑'
        },

        {
            questions: 'プログラミングは好きですか？',
            answers: [
                '😄',
                '😌',
                '😥',
                '😡'
            ],
            correct: '😄',
            hint: 'ヒントなんてありません！！自分の心に問いかけてみてください！！'
        }
    ]


    // 変数等を定義
    const $btn = document.querySelectorAll('button');
    const quizLength = quiz.length;
    let quizNum = 0;
    let cor = 0;
    let btnLength = $btn.length;
    let handlerNum = 0;
    let isPlaying = false;
    let num = 1;

    // 問題文と回答を記述
    function setQuiz() {
        const questionNum = document.getElementById('question-number');
        questionNum.textContent = `Q.${num}`;
        const content = document.getElementById('target-question');
        content.textContent = quiz[quizNum].questions;
        let btnNum = 0;
        while (btnNum < btnLength) {
            $btn[btnNum].textContent = quiz[quizNum].answers[btnNum];
            btnNum++;
        }
        // ヒントを表示
        const modalText = document.getElementById('modal-text');
        modalText.textContent = quiz[quizNum].hint;
        num++;
    }

    // スタートする時の処理
    document.addEventListener('keydown', (e) => {
        if (isPlaying === true) {
            return;
        }

        if (e.key === 'Enter') {
            const start = document.getElementById('hide');
            start.classList.remove('hide');
            const before = document.getElementById('before');
            before.classList.add('before');
            isPlaying = true;
            setQuiz();
        }
    })



    // 正誤判定
    function eventHandler(e) {
        if (e.target.textContent === quiz[quizNum].correct) {
            alert('正解です');
            cor++;
        } else {
            alert('不正解です');
        }
        quizNum++;

        if (quizNum < quizLength) {
            // 問題を再セット
            setQuiz();
        } else {
            // 結果画面の表示
            const start = document.getElementById('hide');
            start.classList.add('hide');
            const after = document.getElementById('after');
            after.classList.remove('after');
            after.addEventListener('click', () => {
                window.location.reload();
            })
            const result = document.createElement('p');
            result.textContent = `正解数：${cor}`
            result.classList.add('style');
            after.appendChild(result);
        }
    }

    // クリックした時のイベントを定義
    while (handlerNum < btnLength) {
        $btn[handlerNum].addEventListener('click', (e) => {
            eventHandler(e);
        })
        handlerNum++;
    }


    // モーダルの処理
    const open = document.getElementById('open');
    const close = document.getElementById('close');
    const modal = document.getElementById('modal');
    const mask = document.getElementById('mask');
    open.addEventListener('click', () => {
        modal.classList.remove('hidden');
        mask.classList.remove('hidden');
    })

    close.addEventListener('click', () => {
        modal.classList.add('hidden');
        mask.classList.add('hidden');
    })

    mask.addEventListener('click', () => {
        close.click();
    })





}