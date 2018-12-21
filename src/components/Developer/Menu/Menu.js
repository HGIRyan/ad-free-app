import React ,{ Component } from 'react';
import { Link } from 'react-router-dom'

class Menu extends Component {
  constructor() {
      super()
      
      this.state = {
          
      }
  }
  
  render() {
      return (
          <div>
              <div className='Menu' >
            <Link to='/dev/addapp'>
                <p>Add an App</p>
            </Link>
            <Link to='/dev/devinfo'>
                <p>Developer Info</p>
            </Link>
            </div>
          </div>
      )
  }
}

export default Menu;