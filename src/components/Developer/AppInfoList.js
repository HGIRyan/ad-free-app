import React from 'react';

function AppInfoList(props) {
    let { appName, app_id, dev_id} = props
    console.log('CHILD APP',app_id)
    return (
        <div>
            <button onClick={()=>{props.getAppData({'app_id':app_id, 'dev_id':dev_id})}}>{appName}</button>
        </div>
    )
}

export default AppInfoList;