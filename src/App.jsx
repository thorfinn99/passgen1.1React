import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const copyPasswordToClip = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(() => {
    
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllow){
      str+="1234567890"
    }
    if(charAllow){
      str+="!@#$%^&*()_+=-"
    }

    for(let i = 1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length +1)
      pass+= str.charAt(char)
    }
    setPassword(pass)

  }, [length, numAllow, charAllow, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllow, charAllow, passwordGenerator])


  return (
    <>
    <div className='w-full max-w-md mx-auto  shadow-md rounded-lg px-4 my-8 text-orange-500 mt-50 bg-gray-800' >
    <div className='flex flex-col  shadow rounded-lg overflow-hidden mb-4' >
    <h1 className='text-white text-4xl my-3' >Password generator</h1>

    <input 
    type="text" 
    value={password}
    className='outline-none w-full py-2 px-3 rounded-md'
    placeholder='Password'
    readOnly
    ref={passwordRef}
    />

    </div>
    <button onClick={copyPasswordToClip} className='bg-orange-500 text-black px-5 rounded-md font-semibold py-1 mb-4 ' >copy</button>
    <div className='flex text-sm gap-x-2 mb-4 ' >
      <div className='flex items-center gap-x-1 mb-4' >
          <input type="range" 
          min={6}
          max={20}
          value={length}
          className='cursor-pointer'
          onChange={(e) =>{
            {setLength(e.target.value)}
          }}
          />
          <label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1 ml-6 mb-4' >
        <input type="checkbox"
        defaultChecked={numAllow}
        id='numbeInput'
        onChange={() =>{
          setNumAllow((prev) => !prev)
        }}
        />
        <label htmlFor="numberInput">Numbers</label>

        <input type="checkbox" className='ml-2'
        defaultChecked={charAllow}
        id='charInput'
        onChange={() =>{
          setNumAllow((prev) => !prev)
        }}
        />
        <label htmlFor="charInput">Characters</label>
      </div>
    </div>
    </div>
    </> 
  )
}

export default App
