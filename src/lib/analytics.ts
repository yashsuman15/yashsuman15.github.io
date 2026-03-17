import posthog from 'posthog-js';

/**
 * Initialize PostHog analytics
 * - Cookieless mode (no cookie banner needed)
 * - Only initializes if key is provided
 * - Auto-captures page views and page leaves
 */
export function initAnalytics() {
  const key = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
  const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

  if (!key) {
    console.log('[Analytics] PostHog key not found, skipping initialization');
    return;
  }

  posthog.init(key, {
    api_host: host || 'https://us.i.posthog.com',
    persistence: 'memory', // Cookieless - no cookie banner needed
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true, // Auto-track all clicks, forms, etc.
  });

  console.log('[Analytics] PostHog initialized');
}

/**
 * Track a custom event
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  posthog.capture(eventName, properties);
}

/**
 * Track a button/link click
 */
export function trackClick(label: string, properties?: Record<string, unknown>) {
  trackEvent('click', { label, ...properties });
}

/**
 * Track chat interactions
 */
export function trackChat(action: string, properties?: Record<string, unknown>) {
  trackEvent(`chat_${action}`, properties);
}

/**
 * Track project interactions
 */
export function trackProject(action: string, projectTitle: string, properties?: Record<string, unknown>) {
  trackEvent(`project_${action}`, { project_title: projectTitle, ...properties });
}

/**
 * Track form interactions
 */
export function trackForm(action: string, formName: string, properties?: Record<string, unknown>) {
  trackEvent(`form_${action}`, { form_name: formName, ...properties });
}
