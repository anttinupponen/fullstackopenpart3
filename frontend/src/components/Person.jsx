import PropTypes from 'prop-types'

const Person = ({person, func}) => (
  <li style={{ display: 'flex', alignItems: 'center' }}>
    <p style={{ marginRight: '10px' }}> {person.name} {person.number} </p>
    <button onClick={() => func(person.id)}>Delete</button>
  </li>
)

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
  }).isRequired,
  func: PropTypes.func.isRequired
}

export default Person