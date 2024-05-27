tinymce.init({
  selector: 'textarea',
  resize : "both",
  plugins: ['link','image','charmap','preview','anchor','searchreplace','visualblocks','fullscreen','insertdatetime','media','table','help','wordcount'

  ],
  toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
    'alignleft aligncenter alignright alignjustify | ' +
    'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
  
});