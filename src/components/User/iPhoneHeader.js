import React, { Component } from 'react';
import Clock from 'react-live-clock'

// SVG
import Data from './../../Assets/MenuBariPhone/Medium Connection-595b40b75ba036ed117d66c2.svg'
import Wifi from './../../Assets/MenuBariPhone/Wi-fi-595b40b75ba036ed117d72fe.svg'
import Lock from './../../Assets/MenuBariPhone/Lock Landscape-595b40b75ba036ed117d9829.svg'
import Location from './../../Assets/MenuBariPhone/Location-595b40b85ba036ed117db981.svg'
import Timer from './../../Assets/MenuBariPhone/Clock-595b40b85ba036ed117dbfdf.svg'
import Battery from './../../Assets/MenuBariPhone/Low Battery-595b40b85ba036ed117dc242.svg'

class iPhoneHeader extends Component {
    constructor() {
        super()

        this.state = {

        }
    }

    render() {
        return (
            <div className='iPhonebar'>
                <div className='ServiceReception'>
                    <img src={Data} alt='' />
                    <img src={Wifi} alt='' />
                </div>
                <div className='barTime'>
                    <Clock
                        format={'HH:MM '}
                        ticking={true}
                        timezone={'America/Denver'} />
                        PM
                </div>
                <div className='barMisc'>
                    <img src={Lock} alt='' />
                    <img src={Location} alt='' />
                    <img src={Timer} alt='' />
                    <img src={Battery} alt='' />
                </div>
            </div>
        )
    }
}

export default iPhoneHeader;