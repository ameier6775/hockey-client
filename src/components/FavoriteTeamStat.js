import React, { useCallback, useState, useLayoutEffect } from 'react'
export default () => {
  const [teams, setTeams] = useState()
  const [reversed, setReversed] = useState()
  const [currentSortedBy, setCurrentlySortedBy] = useState()

  useLayoutEffect(() => {
    setTeams({
      favTeams: [
        {
          division: '',
          favorite: false,
          goalsAgainstPerGameNums: '',
          goalsAgainstPerGameRank: '',
          goalsPerGameNums: '',
          goalsPerGameRank: '',
          id: '',
          lossNums: '',
          name: '',
          otNums: '',
          powerPlayPct: '',
          powerPlayRank: '',
          penaltyKillPct: '',
          penaltyKillRank: '',
          ptsNums: '',
          ptsRank: '',
          savePctgRank: '',
          roster: [
            {
              id: '',
              fullName: '',
              link: '',
            },
          ],
          shotsAllowedPerGameNums: '',
          shotsPerGameNums: '',
          winNums: '',
        },
      ],
    })
  }, [])

  const handleSort = useCallback(() => {
    setTeams()
  }, [teams])

  return <div></div>
}
