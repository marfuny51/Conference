const PAGES_LOADING='PAGES_LOADING';
const PAGES_ERROR='PAGES_ERROR';
const PAGES_SET='PAGES_SET';

const pagesLoadingAC=function() {
  return {
    type: PAGES_LOADING,
  };
}

const pagesErrorAC=function() {
  return {
    type:PAGES_ERROR,
  };
}

const pagesSetAC=function(info) {
  return {
    type: PAGES_SET,
    info:info,
  };
}

export {
  pagesLoadingAC,PAGES_LOADING,
  pagesErrorAC,PAGES_ERROR,
  pagesSetAC,PAGES_SET,
}
