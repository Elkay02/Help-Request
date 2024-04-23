import './sortOverlay.css'

export default function SortOverlay({ setShow, setCat }: { setShow: any, setCat: any }) {
  return (
    <div id='sortOverlay' >
      <h3 onClick={() => { setCat('rating'); setShow(false) }}>Rating</h3>
      <hr />
      <h3 onClick={() => { setCat('people'); setShow(false) }}>Number of People <br /> Helped</h3>
    </div>
  )
}