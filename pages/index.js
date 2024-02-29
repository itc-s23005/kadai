import React, { useState, useEffect } from 'react'

const IndexPage = ({ seiza, color, un0, un1 }) => {
  const [rankings, setRankings] = useState([])

  useEffect(() => {
    // 初回ランキング生成
    generateRankings()

    // 一定間隔で新しいランキングを生成
    const interval = setInterval(generateRankings, 60000) // 60秒ごとに更新

    return () => clearInterval(interval) // アンマウント時にクリア
  }, [seiza, color, un0, un1])

  // ランキング生成関数
  const generateRankings = () => {
    const rank = []
    let un_r, color_r, un

    for (let i = 0; i < seiza.length; ) {
      let n = 0
      un_r = Math.floor(Math.random() * seiza.length)
      color_r = Math.floor(Math.random() * color.length)

      while (n < seiza.length) {
        if (seiza[un_r] !== rank[n]) {
          n++
        } else {
          break
        }
      }

      if (n >= seiza.length) {
        i++
        if (i >= 0 && i <= 2) {
          un = 0
        } else if (i >= 3 && i <= 5) {
          un = 1
        } else if (i >= 6 && i <= 8) {
          un = 2
        } else if (i >= 9 && i <= 10) {
          un = 3
        } else if (i >= 11 && i <= 12) {
          un = 4
        }

        rank.push(seiza[un_r])

        const rankingElement = (
          <div key={i} className='ranking-item'>
            <ul>
              <li>
                第{i}位{seiza[un_r]}
              </li>
              <li>今日のアナタの運勢は{un0[un]}です</li>
              <li>{un1[un]}</li>
              <li>今日のラッキーカラーは{color[color_r]}です</li>
            </ul>
          </div>
        )

        setRankings(prevRankings => [...prevRankings, rankingElement])
      }
    }
  }

  return (
    <div>
      <p>今日の星座ランキング</p>
      <div className='rankings-container'>{rankings}</div>
    </div>
  )
}

IndexPage.getInitialProps = () => {
  const seiza = [
    'おひつじ座',
    'おうし座',
    'ふたご座',
    'かに座',
    'しし座',
    'おとめ座',
    'てんびん座',
    'さそり座',
    'いて座',
    'やぎ座',
    'みずがめ座',
    'うお座'
  ]
  const color = ['赤', '青', '緑', '黄色', '紫', 'ピンク', '茶', '白', '黒']
  const un0 = ['最高', '良い', 'ふつう', 'ちょっと悪い', 'サイアク']
  const un1 = [
    '今日のアナタは絶好調！何をやってもうまくいきます。苦手なことに再チャレンジしたら案外うまくいくかも！',
    '今日は調子が良い日。久しぶりに昔の友だちに連絡してもるのもいいかも！',
    '今日はとてもいつもどおりな日。気を抜きすぎて寝坊をしやすくなるかも？',
    '今日はなんだか気分が良くない日。忘れ物には気をつけて！',
    '今日は何もせずゆっくりしているのがいいかも・・・'
  ]

  return { seiza, color, un0, un1 }
}

export default IndexPage
