import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import { statsByWeek } from '../models/Record'

import ReportsList from './ReportsList'

class ReportsPage extends React.PureComponent {
  static propTypes = {
    stats: PropTypes.array.isRequired
  }

  render () {
    const { stats } = this.props

    return (
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column width={12}>
            <ReportsList stats={stats} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

function mapState ({ records }) {
  return { stats: statsByWeek(records.all) }
}

export default connect(mapState)(ReportsPage)
