import React from 'react';

import Topics from './Topics';
import { withDataLoad } from './withDataLoad';

class TopicsRoot extends React.PureComponent {

 fetchConfig={
    URL: "https://fe.it-academy.by/AjaxStringStorage2.php",
    type: 'POST', dataType: 'json',
    data: {
      f: 'LOCKGET', n: 'NAKVAS_PROJECT_NU_POGODI',
      p: Math.random()
    },
    headers: {
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
