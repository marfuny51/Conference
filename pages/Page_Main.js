import React from 'react';
import './Page_Main.css';

class Page_Main extends React.PureComponent {
          
  render() {

    return (
      <div className='Main'>
        <h1>We will be glad to see you on IT-conference for beginners</h1>
        <p>Place to meet: Minsk, Nezavisimosti Ave, 20<br/>
        Time to meet: 9:00 the 16th of May 2020</p>
        <p className='Place'>If you want to be with us, please, write us any suitable way:</p>
        <p className='Net'><a href='mailto:marfuny51@gmail.com' alt='Почта' title='Почта'><i className="fa fa-envelope" aria-hidden="true"></i></a>
          <a href='https://vk.com/marfuny' alt='Вконтакте' title='Вконтакте'><i className="fa fa-vk" aria-hidden="true"></i></a>
          <a href='https://www.facebook.com/marina.nakvas' alt='Facebook' title='Facebook'><i className="fa fa-facebook" aria-hidden="true"></i></a>
          <a href='https://www.instagram.com/marinanakvas/' alt='Instagram' title='Instagram'><i className="fa fa-instagram" aria-hidden="true"></i></a>
        </p>
      </div>
    );
    
  }

}
    
export default Page_Main;
    