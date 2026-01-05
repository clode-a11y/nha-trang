import Link from 'next/link'

export default function SeaServicePage() {
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
              <li className="text-white">Sea Freight</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Sea Freight Services
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Cost-effective ocean shipping solutions for large volumes. Container and LCL options for all your cargo needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/request?service=sea" className="btn-primary">
                  Get Quote
                </Link>
                <Link href="/calculator?service=sea" className="btn-outline border-white text-white hover:bg-white hover:text-[#1B3B6F]">
                  Calculate Cost
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-24 h-24 text-[#E5A835]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
              <div className="text-3xl md:text-4xl font-bold text-[#1B3B6F]">25-35</div>
              <div className="text-[#1B3B6F]/80 font-medium">Days Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1B3B6F]">$2</div>
              <div className="text-[#1B3B6F]/80 font-medium">Per kg from</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1B3B6F]">FCL/LCL</div>
              <div className="text-[#1B3B6F]/80 font-medium">Options</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1B3B6F]">100%</div>
              <div className="text-[#1B3B6F]/80 font-medium">Insurance</div>
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
              <h2 className="text-3xl font-bold text-[#1B3B6F] mb-6">About Sea Freight Service</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Sea freight is the most economical way to transport large volumes of cargo. Whether you need full container load (FCL) or less than container load (LCL), we offer flexible solutions to meet your shipping requirements.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our extensive network of shipping partners ensures reliable transit times and competitive rates for shipments between Russia and Vietnam.
              </p>

              <h3 className="text-2xl font-bold text-[#1B3B6F] mb-4">Key Advantages</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  'Most economical option',
                  'FCL & LCL available',
                  'Large cargo capacity',
                  'Regular departures',
                  'Port-to-port service',
                  'Door-to-door delivery',
                  'Customs clearance',
                  'Cargo consolidation',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#f5f7fa]">
                    <svg className="w-5 h-5 text-[#E5A835] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#1B3B6F] font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-[#1B3B6F] mb-4">Container Types</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { type: '20\' Standard', capacity: '33 CBM / 28 tons' },
                  { type: '40\' Standard', capacity: '67 CBM / 26 tons' },
                  { type: '40\' High Cube', capacity: '76 CBM / 26 tons' },
                  { type: 'Reefer', capacity: 'Temperature controlled' },
                ].map((item, i) => (
                  <div key={i} className="p-4 border border-gray-200 hover:border-[#E5A835] transition-colors">
                    <h4 className="font-bold text-[#1B3B6F] mb-1">{item.type}</h4>
                    <p className="text-gray-600 text-sm">{item.capacity}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-[#1B3B6F] mb-4">Types of Cargo</h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  'Commercial goods',
                  'Machinery',
                  'Raw materials',
                  'Furniture',
                  'Vehicles',
                  'Building materials',
                  'Consumer goods',
                  'Industrial equipment',
                ].map((item, i) => (
                  <span key={i} className="px-4 py-2 bg-[#1B3B6F] text-white text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Request Form */}
              <div className="bg-[#1B3B6F] p-8 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Get a Free Quote</h3>
                <p className="text-gray-300 mb-6">Fill out the form and we&apos;ll contact you within 2 hours</p>
                <Link href="/request?service=sea" className="btn-primary w-full text-center block">
                  Request Quote
                </Link>
              </div>

              {/* Contact Info */}
              <div className="bg-[#f5f7fa] p-8 mb-8">
                <h3 className="text-xl font-bold text-[#1B3B6F] mb-4">Need Help?</h3>
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
                    { name: 'Rail Freight', href: '/services/rail' },
                    { name: 'Road Freight', href: '/services/road' },
                    { name: 'Project Logistics', href: '/services/project' },
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
            Ready to Ship Your Cargo?
          </h2>
          <p className="text-[#1B3B6F]/80 text-lg mb-8">
            Contact us today for a free quote and let us handle your sea freight needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/request?service=sea" className="btn-secondary">
              Get Started
            </Link>
            <Link href="/tracking" className="bg-white text-[#1B3B6F] px-8 py-3 font-semibold uppercase tracking-wide hover:bg-gray-100 transition-colors">
              Track Shipment
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
