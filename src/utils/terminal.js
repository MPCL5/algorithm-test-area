export const ErrorText = (text) => <span style={{color: 'red'}} dangerouslySetInnerHTML={{__html: text}} />
export const WarningText = (text) => <span style={{color: 'yellow'}} dangerouslySetInnerHTML={{__html: text}} />
export const InfoText = (text) => <span style={{color: 'blue'}} dangerouslySetInnerHTML={{__html: text}} />
export const SuccessText = (text) => <span style={{color: 'green'}} dangerouslySetInnerHTML={{__html: text}} />