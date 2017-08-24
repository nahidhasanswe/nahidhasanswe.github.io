myAppModule.filter('dateTime',[function(){
    return function(datetime){
        return moment(datetime).format('MMMM D YYYY, h:mm:ss A');
    }
}])