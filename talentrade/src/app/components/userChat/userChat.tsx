import './userChat.css'

export default function UserChat() {
  return (
    <div className='profileCopmsContainer'>
      <h1>Describe your inquiry:</h1>
      <textarea name="Request" id="userChatTextArea" cols={30} rows={10} placeholder='Type Here...'></textarea>
      <button className='profileCopmsButton'>Send</button>
    </div>
  );
}