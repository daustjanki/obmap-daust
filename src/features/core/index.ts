/**
 * Core Feature Module
 */

// Feature definition
export { coreFeature } from './feature';

// Components
export { ErrorBoundary } from './components/common/ErrorBoundary';
export { ProtectedRoute } from './components/common/ProtectedRoute';
export { PWAInstallPrompt, PWAStatusBadge } from './components/common/PWAInstallPrompt';
export { UnifiedLayout } from './components/layout/UnifiedLayout';
export { DesktopLayout } from './components/layout/DesktopLayout';
export { MobileLayout } from './components/layout/MobileLayout';
export { IconRibbon } from './components/layout/IconRibbon';
export { SidebarPanel } from './components/layout/SidebarPanel';
export { WorkspacePane } from './components/layout/WorkspacePane';
export { WorkspaceTabs } from './components/layout/WorkspaceTabs';
export { ImportExportPanel } from './components/layout/ImportExportPanel';
export { EventDebugPanel } from './components/debug/EventDebugPanel';
export { DynamicRoutes } from './components/routing/DynamicRoutes';

// Hooks
export { useIsMobile } from './hooks/useMobile';
export { useToast } from './hooks/useToast';

// Services
export { eventBus, EventType } from './services/events';
export { container, ServiceIds } from './services/container';
export { pluginRegistry } from './services/plugin-registry';
export type { Feature, RouteConfig, FeatureStatus } from './services/plugin-registry';
export { initializeFeatureLoader, getFeatureRoutes, isFeatureEnabled, getAllFeatures } from './services/feature-loader';
