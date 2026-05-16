import ATSTemplate from '../assets/templates/ATSTemplate'
import ClassicTemplate from '../assets/templates/ClassicTemplate'
import MinimalImageTemplate from '../assets/templates/MinimalImageTemplate'
import MinimalTemplate from '../assets/templates/MinimalTemplate'
import ModernTemplate from '../assets/templates/ModernTemplate'

const ResumeTemplateRenderer = ({ data, accentColor }) => {
  if (data?.template === 'classic') return <ClassicTemplate data={data} accentColor={accentColor} />
  if (data?.template === 'modern') return <ModernTemplate data={data} accentColor={accentColor} />
  if (data?.template === 'minimal') return <MinimalTemplate data={data} accentColor={accentColor} />
  if (data?.template === 'minimal-image') return <MinimalImageTemplate data={data} accentColor={accentColor} />

  return <ATSTemplate data={data} accentColor={accentColor} />
}

export default ResumeTemplateRenderer
