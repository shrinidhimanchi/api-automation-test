const configuration =  `--require api-tests/step_definitions
                        --format json:api-tests/output/output.json
                        --format progress:api-tests/output/progress.txt
                        --format rerun:api-tests/output/rerun.txt
                        --format summary:api-tests/output/summary
                        --format usage-json:api-tests/output/usage.ndjson
                        --format usage:api-tests/output/usage.txt
                        --format message:api-tests/output/messages.ndjson api-tests/output/reporter.html
                        --format html:api-tests/output/inBuiltReport.html
                        --format @serenity-js/cucumber
                        --retry 1
                        --retry-tag-filter @rerun
                        --publish-quiet`

const progressBarFormat = `${configuration} --format progress-bar`
const customFormat = `${configuration} --format ./customFormat.js`
  
  module.exports = {
    'default': `${progressBarFormat}`,
    'customReport': `${customFormat}`,
    "dryRun": '--dry-run'
  }