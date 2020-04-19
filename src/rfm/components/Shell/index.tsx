import React from 'react'
import Footer from './Footer'
import Header from './Header'

const Shell: React.FC<{}> = (props) => (
  <div className='flex flex-col min-h-screen'>
    <Header />
    <main className='flex-grow w-full max-w-4xl p-4 mx-auto'>
      {props.children}
    </main>
    <Footer />
  </div>
)

export default Shell
