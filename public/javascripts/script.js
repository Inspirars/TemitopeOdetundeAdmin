let itemInput = document.querySelector("#itemInput")
let imag = document.querySelector('#imag')
let divvy = document.getElementById("divvy")

divvy?.addEventListener('click',()=>{
    itemInput.click()
})

function fasterPreview(uploader){
    console.log("object")
    console.log(uploader)

    console.log(uploader.files)
    if(uploader.files && uploader.files[0]){
        imag.setAttribute('src',window.URL.createObjectURL(uploader.files[0]))
    }
}

itemInput?.addEventListener('change',function(){
    console.log("yeah")
    fasterPreview(this)
})