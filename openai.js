import axios from 'axios'

const chat = async (prompt, onMessage) => {
    const headers = {  
            "Content-Type": "application/json",
            Authorization: "Bearer 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",
    }
    const messages = [{ role: 'user', content: prompt }]

    console.log("=>", prompt)
    axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
        
          model: "gpt-3.5-turbo",
          temperature: 0.5,
          messages: messages          
        }, {headers, timeout:40000}
    ).then(response => {
      console.log(response.data.choices[0].message.content)
      onMessage(response.data.choices[0].message.content)
    }).catch(err=>{console.log(err); onMessage(err.message)}) // error처리
} 

export {chat}
