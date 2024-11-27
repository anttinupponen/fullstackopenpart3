import PropTypes from 'prop-types'

const PersonForm = ({callback, name, nameHandler, number, numHandler}) => (
  <form onSubmit={callback}>
    <div>
      Name: <input value={name} onChange={nameHandler}/>
    </div>
    <div>
      Number: <input value={number} onChange={numHandler}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

PersonForm.propTypes = {
  callback: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  nameHandler: PropTypes.func.isRequired,
  number: PropTypes.string.isRequired,
  numHandler: PropTypes.func.isRequired
}

export default PersonForm