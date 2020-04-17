import React from 'react';

import Topics from './Topics';
import { withDataLoad } from './withDataLoad';

class TopicsRoot extends React.PureComponent {

  ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
  topics; // элемент массива - {id:101, title:"JavaScript", mainWords:'Array, JSON, Ajax', autor: 'Loktev'};
  updatePassword;
  stringName = 'NAKVAS_PROJECT_CONFERENCE';

 fetchConfig={
    URL: this.ajaxHandlerScript, type: 'POST',
    headers: {
      f: 'READ', n: 'NAKVAS_PROJECT_CONFERENCE',
      p: Math.random(),
      "Accept": "application/json",
    },
  };

  
  // HOC возвращает каждый раз НОВЫЙ, обёрнутый компонент
  // поэтому оборачивать в HOC лучше не внутри render, чтобы не рендерить каждый раз НОВЫЙ компонент
  TopicsWithData=withDataLoad(this.topics,"topics")(Topics);

  render() {

    let TopicsWithData=this.TopicsWithData;
    return <TopicsWithData /> ;

  }

}

export default TopicsRoot;
