import React from 'react';

import Topics from './Topics';
import { withDataLoad } from './withDataLoad';

class TopicsRoot extends React.PureComponent {

 fetchConfig={
    URL: "https://fe.it-academy.by/AjaxStringStorage2.php",
    method: 'post',
    headers: {
        "Accept": "application/json",
    },
  };

    ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
    topics; // элемент массива - {id:101, title:"JavaScript", mainWords:'Array, JSON, Ajax', autor: 'Loktev'};
    updatePassword;
    stringName = 'NAKVAS_PROJECT_CONFERENCE';

    refreshMessages() {
        $.ajax({
          url: ajaxHandlerScript,
          type: 'POST', dataType: 'json',
          data: { f: 'READ', n: stringName },
          cache: false,
          success: readReady,
          error: errorHandler
        }
        );
    }

    readReady(callresult) { // сообщения получены - показываем
        if (callresult.error != undefined)
            alert(callresult.error);
        else {
            topics = [];
            if (callresult.result != "") { // либо строка пустая - сообщений нет
            // либо в строке - JSON-представление массива сообщений
                topics = JSON.parse(callresult.result);
            if (!Array.isArray(messages))
                topics = [];
          }
        }
      }

    loadData() {
        updatePassword = Math.random();
        $.ajax({
          url: ajaxHandlerScript,
          type: 'POST', dataType: 'json',
          data: {
            f: 'LOCKGET', n: stringName,
            p: updatePassword
          },
          cache: false,
          success: lockGetReady,
          error: errorHandler
        }
        );
      }
      
      // сообщения получены, добавляет, сохраняет, показывает
    lockGetReady(callresult) {
        if (callresult.error != undefined)
          alert(callresult.error);
        else {
            topics = [];
            if (callresult.result != "") { // либо строка пустая - сообщений нет
            // либо в строке - JSON-представление массива сообщений
                topics = JSON.parse(callresult.result);
            // вдруг кто-то сохранил мусор вместо?
                if (!Array.isArray(topics))
                    topics = [];
            }
      
          var gamerName = document.getElementById('gName').value;
          var gamerScore = lastCount;
          topics.push({ id:101, title:"JavaScript", mainWords:'Array, JSON, Ajax', autor: 'Loktev' });
      
      
          $.ajax({
            url: ajaxHandlerScript,
            type: 'POST', dataType: 'json',
            data: {
              f: 'UPDATE', n: stringName,
              v: JSON.stringify(topics), p: updatePassword
            },
            cache: false,
            success: updateReady,
            error: errorHandler
          }
          );
        }
      }
      
      // сообщения вместе с новым сохранены на сервере
    updateReady(callresult) {
        if (callresult.error != undefined)
          alert(callresult.error);
      }
      
    errorHandler(jqXHR, statusStr, errorStr) {
        alert(statusStr + ' ' + errorStr);
      }
      
      

  // HOC возвращает каждый раз НОВЫЙ, обёрнутый компонент
  // поэтому оборачивать в HOC лучше не внутри render, чтобы не рендерить каждый раз НОВЫЙ компонент
  TopicsWithData=withDataLoad(this.topics,"topics")(Topics);

  render() {

    let TopicsWithData=this.TopicsWithData;
    return <TopicsWithData /> ;

  }

}

export default TopicsRoot;
