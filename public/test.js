var states = {
  utah: 2942902,
  texas: 26956958,
  california: 38802500
};

function statesLooper(obj) {
  for(var key in obj) {
    if(obj.key > 3000000) {
      obj.key = 0;
    }
  }
  return obj;
}
