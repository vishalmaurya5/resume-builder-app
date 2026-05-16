const formatDate = (dateStr) => {
  if (!dateStr) return ''
  if (dateStr.toLowerCase?.() === 'present') return 'Present'

  const [year, month] = dateStr.split('-')
  if (!year) return dateStr

  return new Date(year, month ? Number(month) - 1 : 0).toLocaleDateString('en-US', {
    year: 'numeric',
    month: month ? 'short' : undefined,
  })
}

const SectionTitle = ({ children }) => (
  <h2 className="mt-6 border-b border-zinc-300 pb-1 text-[13px] font-bold uppercase tracking-wide text-zinc-900">
    {children}
  </h2>
)

const BulletText = ({ text }) => {
  const lines = text
    ?.split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (!lines?.length) return null

  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] leading-relaxed text-zinc-800">
      {lines.map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  )
}

const ATSTemplate = ({ data }) => {
  const info = data.personal_info || {}
  const contact = [info.location, info.phone, info.email, info.linkedin, info.website].filter(Boolean)

  return (
    <article className="mx-auto min-h-[1120px] max-w-[795px] bg-white px-16 py-14 text-zinc-900 shadow-sm">
      <header className="border-b-4 border-zinc-900 pb-3">
        <h1 className="text-[24px] font-extrabold uppercase leading-none tracking-tight">
          {info.full_name}
        </h1>
        {info.profession && <p className="mt-1 text-[14px] font-bold uppercase">{info.profession}</p>}
        {contact.length > 0 && (
          <p className="mt-2 text-[11px] font-medium leading-relaxed text-zinc-700">{contact.join('  |  ')}</p>
        )}
      </header>

      {data.professional_summary && (
        <section>
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="mt-3 text-[12px] font-medium leading-relaxed text-zinc-800">
            {data.professional_summary}
          </p>
        </section>
      )}

      {data.skills?.length > 0 && (
        <section>
          <SectionTitle>Core Competencies / Key Skills</SectionTitle>
          <div className="mt-3 grid grid-cols-2 gap-x-12 gap-y-1 text-[12px] font-medium text-zinc-800">
            {data.skills.map((skill, index) => (
              <div key={`${skill}-${index}`} className="flex gap-2">
                <span className="mt-[2px] text-zinc-900">•</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section>
          <SectionTitle>Professional Experience</SectionTitle>
          <div className="mt-3 space-y-4">
            {data.experience.map((item, index) => (
              <div key={item._id || index}>
                <div className="flex items-start justify-between gap-6 text-[12px]">
                  <div>
                    {item.position && <h3 className="font-bold text-zinc-900">{item.position}</h3>}
                    {item.company && <p className="font-semibold text-zinc-700">{item.company}</p>}
                  </div>
                  <p className="shrink-0 font-semibold text-zinc-700">
                    {formatDate(item.start_date)} - {item.is_current ? 'Present' : formatDate(item.end_date)}
                  </p>
                </div>
                <BulletText text={item.description} />
              </div>
            ))}
          </div>
        </section>
      )}

      {data.project?.length > 0 && (
        <section>
          <SectionTitle>Projects</SectionTitle>
          <div className="mt-3 space-y-3">
            {data.project.map((project, index) => (
              <div key={project._id || index} className="text-[12px] leading-relaxed">
                {project.name && <h3 className="font-bold text-zinc-900">{project.name}</h3>}
                {project.type && <p className="font-semibold text-zinc-700">{project.type}</p>}
                <BulletText text={project.description} />
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education?.length > 0 && (
        <section>
          <SectionTitle>Education</SectionTitle>
          <div className="mt-3 space-y-3">
            {data.education.map((item, index) => (
              <div key={item._id || index} className="flex justify-between gap-6 text-[12px]">
                <div>
                  <h3 className="font-bold text-zinc-900">
                    {item.degree} {item.field ? `in ${item.field}` : ''}
                  </h3>
                  {item.institution && <p className="font-semibold text-zinc-700">{item.institution}</p>}
                  {item.gpa && <p className="text-zinc-700">GPA: {item.gpa}</p>}
                </div>
                <p className="shrink-0 font-semibold text-zinc-700">{formatDate(item.graduation_date)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.certificates?.length > 0 && (
        <section>
          <SectionTitle>Certifications</SectionTitle>
          <div className="mt-3 space-y-3">
            {data.certificates.map((item, index) => (
              <div key={item._id || index} className="flex justify-between gap-6 text-[12px]">
                <div>
                  {item.name && <h3 className="font-bold text-zinc-900">{item.name}</h3>}
                  {item.issuer && <p className="font-semibold text-zinc-700">{item.issuer}</p>}
                  {item.credential_url && <p className="break-all text-zinc-700">{item.credential_url}</p>}
                  <BulletText text={item.description} />
                </div>
                <p className="shrink-0 font-semibold text-zinc-700">{formatDate(item.issue_date)}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

export default ATSTemplate
