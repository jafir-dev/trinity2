<?php
/**
 * Demo Data Seeder for Trinity Media Theme
 * Generates sample services, portfolio, testimonials on theme activation
 */

function trinity_create_demo_data() {
	// Only run once per theme activation
	if ( get_option( 'trinity_demo_data_installed' ) ) {
		return;
	}

	// Create service posts
	trinity_create_demo_services();

	// Create portfolio posts
	trinity_create_demo_portfolio();

	// Create testimonials
	trinity_create_demo_testimonials();

	// Set demo theme options
	trinity_set_demo_options();

	// Mark as installed
	update_option( 'trinity_demo_data_installed', true );
}

function trinity_create_demo_services() {
	$services = array(
		array(
			'title'       => 'Brand Identity Design',
			'description' => 'Comprehensive brand identity systems including logo design, color palettes, typography guidelines, and brand voice documentation. We craft distinctive visual identities that resonate with your target audience and establish market presence.',
			'category'    => 'Design',
		),
		array(
			'title'       => 'Digital Marketing Strategy',
			'description' => 'Strategic planning and execution of multi-channel digital campaigns. From SEO and content marketing to paid advertising, we develop data-driven strategies that maximize ROI and drive sustainable growth.',
			'category'    => 'Marketing',
		),
		array(
			'title'       => 'Website Development',
			'description' => 'Custom website development using modern technologies. Responsive design, fast performance, and conversion-focused architecture. From simple brochures to complex web applications.',
			'category'    => 'Development',
		),
		array(
			'title'       => 'Mobile App Development',
			'description' => 'Native and cross-platform mobile applications for iOS and Android. User-centric design with robust backend infrastructure, real-time synchronization, and seamless performance.',
			'category'    => 'Development',
		),
		array(
			'title'       => 'UI/UX Design',
			'description' => 'User interface and experience design focused on usability and aesthetic excellence. Wireframing, prototyping, user testing, and iterative design refinement.',
			'category'    => 'Design',
		),
		array(
			'title'       => 'Content Creation',
			'description' => 'Professional content production including photography, videography, and copywriting. High-quality visual and written content tailored to your brand voice and marketing objectives.',
			'category'    => 'Content',
		),
		array(
			'title'       => 'Social Media Management',
			'description' => 'End-to-end social media strategy, content creation, community management, and analytics. Building engaged audiences across all major platforms with consistent brand messaging.',
			'category'    => 'Marketing',
		),
		array(
			'title'       => 'E-commerce Solutions',
			'description' => 'Complete e-commerce platform setup including product catalog management, payment integration, inventory systems, and conversion optimization strategies.',
			'category'    => 'Development',
		),
		array(
			'title'       => 'SEO Optimization',
			'description' => 'Technical SEO, on-page optimization, content strategy, and link building. Improving search rankings, organic traffic, and long-term visibility in search results.',
			'category'    => 'Marketing',
		),
		array(
			'title'       => 'Video Production',
			'description' => 'Professional video content from concept to final delivery. Commercials, product videos, explainers, testimonials, and promotional content with cinema-quality production standards.',
			'category'    => 'Content',
		),
		array(
			'title'       => 'Web Analytics',
			'description' => 'Comprehensive website analytics implementation, data analysis, and actionable insights. Understanding user behavior to optimize conversion rates and user experience.',
			'category'    => 'Analytics',
		),
		array(
			'title'       => 'Email Marketing',
			'description' => 'Strategic email campaigns with personalization, automation, and A/B testing. Building subscriber lists and nurturing customer relationships through targeted communication.',
			'category'    => 'Marketing',
		),
		array(
			'title'       => 'Branding Workshop',
			'description' => 'Collaborative workshops to define brand strategy, values, positioning, and messaging. Facilitating stakeholder alignment on brand direction and market positioning.',
			'category'    => 'Strategy',
		),
		array(
			'title'       => 'User Research',
			'description' => 'In-depth qualitative and quantitative research to understand user needs, pain points, and behaviors. Informing design and product decisions with real user insights.',
			'category'    => 'Research',
		),
		array(
			'title'       => 'API Development',
			'description' => 'RESTful and GraphQL API design and development. Scalable backend architecture, authentication, rate limiting, and comprehensive API documentation.',
			'category'    => 'Development',
		),
		array(
			'title'       => 'CMS Integration',
			'description' => 'Custom WordPress, headless CMS, or proprietary CMS implementation. Content management systems tailored to your workflow and publishing needs.',
			'category'    => 'Development',
		),
		array(
			'title'       => 'Performance Optimization',
			'description' => 'Website speed optimization, image compression, caching strategies, and Core Web Vitals improvement. Ensuring fast load times across all devices and networks.',
			'category'    => 'Development',
		),
		array(
			'title'       => 'Brand Guidelines Documentation',
			'description' => 'Comprehensive brand guidelines covering visual identity, typography, tone of voice, and usage standards. Living documents that evolve with your brand.',
			'category'    => 'Design',
		),
		array(
			'title'       => 'Conversion Rate Optimization',
			'description' => 'Systematic testing and optimization of website elements to improve conversion rates. A/B testing, heatmap analysis, and user behavior optimization.',
			'category'    => 'Analytics',
		),
	);

	foreach ( $services as $service ) {
		$post_id = wp_insert_post( array(
			'post_type'    => 'service',
			'post_title'   => $service['title'],
			'post_content' => $service['description'],
			'post_status'  => 'publish',
		) );

		if ( ! is_wp_error( $post_id ) ) {
			// Set category taxonomy
			wp_set_object_terms( $post_id, $service['category'], 'service_category' );

			// Set featured image placeholder
			trinity_set_featured_image( $post_id, 'service' );
		}
	}
}

function trinity_create_demo_portfolio() {
	$portfolio = array(
		array(
			'title'       => 'TechFlow Mobile App',
			'description' => 'iOS and Android mobile application for project management and team collaboration. Features real-time synchronization, offline capabilities, and enterprise-grade security.',
			'category'    => 'Mobile App',
			'details'     => 'Platform: iOS, Android | Client: Tech Startup | Timeline: 6 months | Team: 8 developers',
		),
		array(
			'title'       => 'EcoWave E-commerce Platform',
			'description' => 'Sustainable fashion e-commerce platform with custom inventory management, AI-powered recommendations, and subscription box integration.',
			'category'    => 'E-commerce',
			'details'     => 'Platform: Web | Client: Fashion Retailer | Timeline: 4 months | Revenue Impact: +320%',
		),
		array(
			'title'       => 'FinanceHub Dashboard',
			'description' => 'Enterprise financial analytics dashboard with real-time data visualization, automated reporting, and predictive analytics.',
			'category'    => 'Web App',
			'details'     => 'Platform: Web SaaS | Client: Financial Services | Timeline: 8 months | Users: 50k+',
		),
		array(
			'title'       => 'HealthConnect Patient Portal',
			'description' => 'Patient management system with appointment scheduling, telemedicine integration, medical records access, and prescription management.',
			'category'    => 'Healthcare',
			'details'     => 'Platform: Web, Mobile | Client: Medical Network | Timeline: 5 months | Patients Served: 25k+',
		),
		array(
			'title'       => 'Global Logistics Platform',
			'description' => 'Real-time shipment tracking, logistics optimization, and supply chain visibility across international borders.',
			'category'    => 'Logistics',
			'details'     => 'Platform: Web, Mobile | Client: Logistics Corp | Timeline: 12 months | Shipments Tracked: 10M+',
		),
		array(
			'title'       => 'EduConnect Learning Platform',
			'description' => 'Online learning management system with video streaming, interactive quizzes, student progress tracking, and certification management.',
			'category'    => 'EdTech',
			'details'     => 'Platform: Web, Mobile | Client: Education Provider | Timeline: 6 months | Students: 100k+',
		),
		array(
			'title'       => 'RealEstate Marketplace',
			'description' => 'Property listing platform with virtual tours, mortgage calculator, saved properties, and agent communication tools.',
			'category'    => 'Real Estate',
			'details'     => 'Platform: Web, Mobile | Client: Real Estate Agency | Timeline: 4 months | Listings: 50k+',
		),
		array(
			'title'       => 'Social Impact Dashboard',
			'description' => 'NGO management platform for tracking impact metrics, volunteer coordination, donation management, and community engagement.',
			'category'    => 'Social Impact',
			'details'     => 'Platform: Web | Client: Non-profit Organization | Timeline: 3 months | Impact: 40k beneficiaries',
		),
		array(
			'title'       => 'FitnessTrack Analytics',
			'description' => 'Fitness tracking application with workout logging, nutrition tracking, progress visualization, and personalized recommendations.',
			'category'    => 'Health & Wellness',
			'details'     => 'Platform: Mobile | Client: Fitness App | Timeline: 5 months | Active Users: 250k+',
		),
	);

	foreach ( $portfolio as $item ) {
		$post_id = wp_insert_post( array(
			'post_type'    => 'portfolio',
			'post_title'   => $item['title'],
			'post_content' => $item['description'],
			'post_status'  => 'publish',
		) );

		if ( ! is_wp_error( $post_id ) ) {
			wp_set_object_terms( $post_id, $item['category'], 'portfolio_category' );

			update_field( 'project_details', $item['details'], $post_id );

			trinity_set_featured_image( $post_id, 'portfolio' );
		}
	}
}

function trinity_create_demo_testimonials() {
	$testimonials = array(
		array(
			'name'    => 'Sarah Mitchell',
			'role'    => 'CEO',
			'company' => 'TechFlow Inc',
			'quote'   => 'Trinity Media transformed our digital presence. Their strategic approach and technical expertise delivered results beyond our expectations. Highly recommended.',
		),
		array(
			'name'    => 'James Rodriguez',
			'role'    => 'CMO',
			'company' => 'EcoWave Fashion',
			'quote'   => 'The e-commerce platform they built increased our conversion rate by 320%. Professional team, excellent communication, and outstanding results.',
		),
		array(
			'name'    => 'Priya Patel',
			'role'    => 'Head of Product',
			'company' => 'FinanceHub Solutions',
			'quote'   => 'Working with Trinity Media was seamless. They understood our complex requirements and delivered a world-class dashboard that our clients love.',
		),
		array(
			'name'    => 'Michael Chen',
			'role'    => 'Operations Director',
			'company' => 'Global Logistics Group',
			'quote'   => 'Their logistics platform optimized our operations and reduced costs significantly. The team was responsive and delivered on time.',
		),
		array(
			'name'    => 'Emily Thompson',
			'role'    => 'Founder',
			'company' => 'EduConnect Learning',
			'quote'   => 'Trinity Media built us a learning platform that scales. Their attention to user experience and technical robustness is exceptional.',
		),
		array(
			'name'    => 'David Okonkwo',
			'role'    => 'Marketing Lead',
			'company' => 'RealEstate Marketplace',
			'quote'   => 'Their brand identity work positioned us as market leaders. The design thinking and strategy were instrumental to our success.',
		),
	);

	foreach ( $testimonials as $testimonial ) {
		$post_id = wp_insert_post( array(
			'post_type'    => 'testimonial',
			'post_title'   => $testimonial['name'],
			'post_status'  => 'publish',
		) );

		if ( ! is_wp_error( $post_id ) ) {
			update_field( 'testimonial_name', $testimonial['name'], $post_id );
			update_field( 'testimonial_role', $testimonial['role'], $post_id );
			update_field( 'testimonial_company', $testimonial['company'], $post_id );
			update_field( 'testimonial_quote', $testimonial['quote'], $post_id );

			trinity_set_featured_image( $post_id, 'testimonial' );
		}
	}
}

function trinity_set_featured_image( $post_id, $type = 'service' ) {
	// Generate placeholder image URL (using service like placeholder.com or local)
	$width = 600;
	$height = 400;

	switch ( $type ) {
		case 'portfolio':
			$width  = 800;
			$height = 600;
			$color  = '3B82F6';
			break;
		case 'testimonial':
			$width  = 150;
			$height = 150;
			$color  = '8B5CF6';
			break;
		default: // service
			$width  = 600;
			$height = 400;
			$color  = '7C3AED';
	}

	$placeholder_url = "https://via.placeholder.com/{$width}x{$height}/{$color}/FFFFFF?text=" . urlencode( get_the_title( $post_id ) );

	// For now, we'll skip actual image upload since placeholders work
	// In production, you'd need to handle actual image file uploads
	// and set the attachment ID properly

	// Alternative: Use placeholder metadata approach
	update_post_meta( $post_id, '_trinity_placeholder_image', $placeholder_url );
}

function trinity_set_demo_options() {
	// Primary brand color
	set_theme_mod( 'primary_color', '#7C3AED' );

	// Secondary color
	set_theme_mod( 'secondary_color', '#EC4899' );

	// Dark theme background
	set_theme_mod( 'dark_bg', '#0F172A' );

	// Light theme background
	set_theme_mod( 'light_bg', '#FFFFFF' );

	// Display demo banner
	set_theme_mod( 'show_demo_notice', true );
}

// Hook to theme activation
add_action( 'after_switch_theme', 'trinity_create_demo_data' );

// Optional: Reset demo data
function trinity_reset_demo_data() {
	// Delete all demo posts
	$services = get_posts( array(
		'post_type'   => 'service',
		'numberposts' => -1,
	) );

	foreach ( $services as $service ) {
		wp_delete_post( $service->ID, true );
	}

	$portfolio = get_posts( array(
		'post_type'   => 'portfolio',
		'numberposts' => -1,
	) );

	foreach ( $portfolio as $item ) {
		wp_delete_post( $item->ID, true );
	}

	$testimonials = get_posts( array(
		'post_type'   => 'testimonial',
		'numberposts' => -1,
	) );

	foreach ( $testimonials as $testimonial ) {
		wp_delete_post( $testimonial->ID, true );
	}

	delete_option( 'trinity_demo_data_installed' );
}

// Add to theme
if ( ! function_exists( 'trinity_reset_demo_data_cli' ) ) {
	function trinity_reset_demo_data_cli() {
		if ( defined( 'WP_CLI' ) && WP_CLI ) {
			WP_CLI::add_command(
				'trinity reset-demo',
				'trinity_reset_demo_data',
				array(
					'shortdesc' => 'Reset Trinity Media demo data',
				)
			);
		}
	}
	add_action( 'wp_loaded', 'trinity_reset_demo_data_cli' );
}
