import PropTypes from 'prop-types'
import Person from './Person'

const ContactList = ({contacts, filter, func}) => (
  <ul>
    {contacts.filter(v => v.name.toLowerCase().includes(filter.toLowerCase()))
            .map((person) => <Person key={'person'+person.id} person={person} func={func}/>)}
  </ul>
)

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired
}

export default ContactList