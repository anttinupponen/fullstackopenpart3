import PropTypes from 'prop-types'

const Filter = ({filter, filterHandler}) => (
  <div>
    Filter: <input value={filter} onChange={filterHandler}/>
  </div>
)

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  filterHandler: PropTypes.func.isRequired
}

export default Filter