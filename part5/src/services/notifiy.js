export default  function notify(message){
    const notifiaction = document.createElement('p')
    notifiaction.id= 'notifier'
    notifiaction.textContent = message
    document.getElementById('pageTitle').append(notifiaction)   
    setTimeout(()=>{
        document.getElementById('notifier').remove()
    }
    ,3000)
    
}