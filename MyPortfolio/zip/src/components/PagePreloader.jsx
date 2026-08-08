import './PagePreloader.css'
export function PagePreloader() {
    return (
        <div id="page-preloader" class="page-preloader" role="status" aria-live="polite" aria-label="Loading page">
            <div class="page-preloader__content">
                <p class="page-preloader__brand">LENSEN DEGIFE</p>
                <div class="page-preloader__rings" aria-hidden="true">
                    <span class="page-preloader__ring"></span>
                    <span class="page-preloader__ring page-preloader__ring--delay"></span>
                </div>
                <p class="page-preloader__hint">Loading portfolio…</p>
            </div>
        </div>

    );
}