import Link from 'next/link'

export default function ProjectServicePage() {
  return (
    <div className="pt-[120px]">
      {/* Hero Section */}
      <section className="bg-[#1B3B6F] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-[#E5A835]">Home</Link></li>
              <li>/</li>
              <li><Link href="/services" className="hover:text-[#E5A835]">Services</Link></li>
              <li>/</li>
              <li className="text-white">Project Logistics</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Project Logistics
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Specialized solutions for oversized, heavy, and complex cargo. Custom logistics for unique shipping challenges.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/request?service=project" className="btn-primary">
                  Get Quote
                </Link>
                <a href="tel:+84xxxxxxxxx" className="btn-outline border-white text-white hover:bg-white hover:text-[#1B3B6F]">
                  Call Us Now
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-24 h-24 text-[#E5A835]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#E5A835] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1B3B6F]">500+</div>
              <div className="text-[#1B3B6F]/80 font-medium">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1B3B6F]">Custom</div>
              <div className="text-[#1B3B6F]/80 font-medium">Solutions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1B3B6F]">OOG</div>
              <div className="text-[#1B3B6F]/80 font-medium">Specialists</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1B3B6F]">24/7</div>
              <div className="text-[#1B3B6F]/80 font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-[#1B3B6F] mb-6">About Project Logistics</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Project logistics requires expertise, experience, and meticulous planning. We specialize in transporting oversized, heavy, and out-of-gauge cargo that cannot be handled through standard shipping methods.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our dedicated project team works closely with you to develop customized logistics solutions, handling everything from route surveys and permits to specialized equipment and on-site coordination.
              </p>

              <h3 className="text-2xl font-bold text-[#1B3B6F] mb-4">Our Capabilities</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  'Route surveys & planning',
                  'Permit management',
                  'Heavy lift operations',
                  'Specialized equipment',
                  'Multi-modal transport',
                  'On-site coordination',
                  'Risk assessment',
                  'Insurance solutions',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#f5f7fa]">
                    <svg className="w-5 h-5 text-[#E5A835] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#1B3B6F] font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-[#1B3B6F] mb-4">Industries We Serve</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { industry: 'Oil & Gas', examples: 'Pipelines, drilling equipment' },
                  { industry: 'Power Generation', examples: 'Turbines, transformers' },
                  { industry: 'Construction', examples: 'Cranes, heavy machinery' },
                  { industry: 'Mining', examples: 'Excavators, dump trucks' },
                  { industry: 'Renewable Energy', examples: 'Wind turbines, solar panels' },
                  { industry: 'Manufacturing', examples: 'Industrial equipment' },
                ].map((item, i) => (
                  <div key={i} className="p-4 border border-gray-200 hover:border-[#E5A835] transition-colors">
                    <h4 className="font-bold text-[#1B3B6F] mb-1">{item.industry}</h4>
                    <p className="text-gray-600 text-sm">{item.examples}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-[#1B3B6F] mb-4">Project Process</h3>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Consultation', desc: 'Initial discussion to understand your project requirements' },
                  { step: '02', title: 'Site Survey', desc: 'Route analysis and technical assessment' },
                  { step: '03', title: 'Planning', desc: 'Detailed logistics plan and timeline development' },
                  { step: '04', title: 'Execution', desc: 'Professional handling with real-time monitoring' },
                  { step: '05', title: 'Completion', desc: 'Safe delivery and documentation handover' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 border border-gray-200 hover:border-[#E5A835] transition-colors">
                    <div className="w-12 h-12 bg-[#E5A835] text-[#1B3B6F] font-bold flex items-center justify-center flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1B3B6F] mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Request Form */}
              <div className="bg-[#1B3B6F] p-8 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Discuss Your Project</h3>
                <p className="text-gray-300 mb-6">Our experts will analyze your requirements and provide a custom solution</p>
                <Link href="/request?service=project" className="btn-primary w-full text-center block">
                  Request Consultation
                </Link>
              </div>

              {/* Contact Info */}
              <div className="bg-[#f5f7fa] p-8 mb-8">
                <h3 className="text-xl font-bold text-[#1B3B6F] mb-4">Project Team</h3>
                <div className="space-y-4">
                  <a href="tel:+84xxxxxxxxx" className="flex items-center gap-3 text-gray-600 hover:text-[#E5A835]">
                    <svg className="w-5 h-5 text-[#E5A835]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +84 xxx xxx xxx
                  </a>
                  <a href="mailto:contact@example.com" className="flex items-center gap-3 text-gray-600 hover:text-[#E5A835]">
                    <svg className="w-5 h-5 text-[#E5A835]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    contact@example.com
                  </a>
                </div>
              </div>

              {/* Other Services */}
              <div className="border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-[#1B3B6F] mb-4">Other Services</h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Air Cargo', href: '/services/air' },
                    { name: 'Sea Freight', href: '/services/sea' },
                    { name: 'Rail Freight', href: '/services/rail' },
                    { name: 'Road Freight', href: '/services/road' },
                  ].map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className="flex items-center justify-between text-gray-600 hover:text-[#E5A835] transition-colors">
                        {item.name}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#E5A835]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#1B3B6F] mb-4">
            Have a Complex Logistics Challenge?
          </h2>
          <p className="text-[#1B3B6F]/80 text-lg mb-8">
            Our project logistics experts are ready to develop a custom solution for your unique requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/request?service=project" className="btn-secondary">
              Start Your Project
            </Link>
            <a href="tel:+84xxxxxxxxx" className="bg-white text-[#1B3B6F] px-8 py-3 font-semibold uppercase tracking-wide hover:bg-gray-100 transition-colors">
              Call Expert Team
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
