// Application logic for LUSH Retail Operation Store Visit Report

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // CẤU HÌNH SUPABASE & CLOUDINARY
    // ==========================================
    const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME';      // Điền Cloud Name của bạn vào đây
    const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';  // Điền Unsigned Upload Preset của bạn vào đây
    const SUPABASE_URL = 'https://izuwqsefoxdntjslxfyg.supabase.co'; // Đã điền sẵn URL Supabase của bạn
    const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';        // Điền Anon API Key của bạn vào đây

    let dbImages = {}; // Bản đồ lưu trữ tạm thời ảnh tải về từ Supabase

    // 1. STATE MANAGEMENT
    let activeWeekId = '2026-W27';
    let activeTabId = 'overall-comments';
    
    // 2. DOM ELEMENTS
    const weekSelect = document.getElementById('week-select');
    const btnPrint = document.getElementById('btn-print');
    const btnReset = document.getElementById('btn-reset');
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxCaption = document.getElementById('lightbox-caption');

    // 3. INITIALIZATION
    async function init() {
        populateWeekDropdown();
        await loadWeekData(activeWeekId);
        setupEventListeners();
    }

    // Populate weeks in select dropdown
    function populateWeekDropdown() {
        weekSelect.innerHTML = '';
        if (typeof REPORT_DATA !== 'undefined' && REPORT_DATA.weeks) {
            Object.values(REPORT_DATA.weeks).forEach(week => {
                const option = document.createElement('option');
                option.value = week.id;
                option.textContent = `Tuần: ${week.name}`;
                weekSelect.appendChild(option);
            });
        }
    }

    // Load data for a specific week
    async function loadWeekData(weekId) {
        if (typeof REPORT_DATA === 'undefined' || !REPORT_DATA.weeks[weekId]) {
            console.error(`No data found for week: ${weekId}`);
            return;
        }
        
        const weekData = REPORT_DATA.weeks[weekId];
        
        // Update document title and print metadata
        document.title = `LUSH Report - Tuần ${weekData.name}`;
        
        // Load images from Supabase
        dbImages = await loadImagesFromSupabase(weekId);
        
        // Render sections
        renderOverallComments(weekData.overall, weekData.stores);
        renderStoreReport('SGCT', weekData.stores.SGCT, weekData.name);
        renderStoreReport('VCDK', weekData.stores.VCDK, weekData.name);
        renderStoreReport('HVP', weekData.stores.HVP, weekData.name);
        
        // Re-bind accordion toggle listeners after rendering store reports
        bindAccordionListeners();
    }

    // 4. EVENT LISTENERS
    function setupEventListeners() {
        // Dropdown selection change
        weekSelect.addEventListener('change', async (e) => {
            activeWeekId = e.target.value;
            await loadWeekData(activeWeekId);
        });

        // Tab Navigation
        navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetPanel = tab.getAttribute('data-target');
                
                // Toggle active tab class
                navTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Toggle active panel visibility
                tabPanels.forEach(panel => {
                    if (targetPanel === 'all-reports') {
                        panel.classList.add('active');
                    } else if (panel.id === `tab-${targetPanel}`) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
                
                activeTabId = targetPanel;
            });
        });

        // Print Action
        if (btnPrint) {
            btnPrint.addEventListener('click', () => {
                window.print();
            });
        }

        // Reset Action (Clear Images)
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                if (confirm('Bạn có chắc chắn muốn xóa toàn bộ hình ảnh đã tải lên không?')) {
                    clearAllWeekImages();
                }
            });
        }

        // Lightbox Close
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Key press escape to close lightbox
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // 5. RENDER OVERALL COMMENTS TAB
    function renderOverallComments(overall, stores) {
        // Print metadata info
        const printMeta = document.getElementById('print-meta-info');
        printMeta.innerHTML = `Đánh giá tuần: <strong>${overall.period}</strong> | Các cửa hàng: <strong>${overall.stores}</strong>`;

        // Render overall dashboard cards
        const dashboard = document.getElementById('overall-dashboard-grid');
        dashboard.innerHTML = '';
        
        overall.summary.forEach(sum => {
            let storeKey = sum.store.includes('Saigon') ? 'SGCT' : 
                           sum.store.includes('Vincom') ? 'VCDK' : 'HVP';
            
            const card = document.createElement('div');
            card.className = 'metric-card';
            card.innerHTML = `
                <div class="metric-header">
                    <h3>${sum.store}</h3>
                    <span class="metric-date">${sum.date}</span>
                </div>
                <div class="metric-value">${sum.vmd.split(' ')[0]}</div>
                <div class="metric-details">
                    <div class="metric-detail-item">
                        <span class="label">Tổng VM</span>
                        <span class="val">${sum.vmd}</span>
                    </div>
                    <div class="metric-detail-item">
                        <span class="label">Kho / Tester</span>
                        <span class="val">K: ${sum.storeroom} | T: ${sum.tester}</span>
                    </div>
                    <div class="metric-detail-item">
                        <span class="label">Kiểm Kho</span>
                        <span class="val">${sum.stock}</span>
                    </div>
                    <div class="metric-detail-item">
                        <span class="label">Ca Trực</span>
                        <span class="val">${sum.staff} nhân sự</span>
                    </div>
                </div>
            `;
            dashboard.appendChild(card);
        });

        // Helper to parse percentages from "Good (VM: 43/45)" style text
        function getPercentFromText(text) {
            const match = text.match(/(\d+)\/(\d+)/);
            if (match) {
                const num = parseInt(match[1]);
                const den = parseInt(match[2]);
                return {
                    percent: Math.round((num / den) * 100),
                    num: num,
                    den: den
                };
            }
            return null;
        }

        // Render Summary Table (Section 1)
        const summaryBody = document.getElementById('summary-table-body');
        summaryBody.innerHTML = '';
        overall.summary.forEach(sum => {
            const tr = document.createElement('tr');
            
            // Extract percentages for inline progress bars
            const vmdP = getPercentFromText(sum.vmd);
            const storeroomP = getPercentFromText(sum.storeroom);
            const testerP = getPercentFromText(sum.tester);
            
            let vmdHtml = `<span class="badge badge-good">${sum.vmd}</span>`;
            if (vmdP) {
                const cls = vmdP.percent >= 90 ? 'good' : vmdP.percent >= 75 ? 'warn' : 'poor';
                vmdHtml += `
                    <div class="table-progress-container">
                        <div class="table-progress-wrapper">
                            <div class="table-progress-bar ${cls}" style="width: ${vmdP.percent}%;"></div>
                        </div>
                    </div>
                `;
            }
            
            let storeroomHtml = `<span class="badge badge-good">${sum.storeroom}</span>`;
            if (storeroomP) {
                const cls = storeroomP.percent >= 90 ? 'good' : storeroomP.percent >= 75 ? 'warn' : 'poor';
                storeroomHtml += `
                    <div class="table-progress-container">
                        <div class="table-progress-wrapper">
                            <div class="table-progress-bar ${cls}" style="width: ${storeroomP.percent}%;"></div>
                        </div>
                    </div>
                `;
            }
            
            let testerHtml = `<span class="badge badge-good">${sum.tester}</span>`;
            if (testerP) {
                const cls = testerP.percent >= 90 ? 'good' : testerP.percent >= 75 ? 'warn' : 'poor';
                testerHtml += `
                    <div class="table-progress-container">
                        <div class="table-progress-wrapper">
                            <div class="table-progress-bar ${cls}" style="width: ${testerP.percent}%;"></div>
                        </div>
                    </div>
                `;
            }
            
            tr.innerHTML = `
                <td style="font-weight: 700;">${sum.store}</td>
                <td>${sum.date}</td>
                <td>${sum.staff}</td>
                <td>${vmdHtml}</td>
                <td>${storeroomHtml}</td>
                <td>${testerHtml}</td>
                <td><span class="badge badge-good">${sum.stock}</span></td>
                <td class="text-left" style="font-size: 13px;">${sum.comment}</td>
            `;
            summaryBody.appendChild(tr);
        });

        // Render General Observations (Section 2)
        const observations = document.getElementById('general-observations');
        observations.innerHTML = '';
        overall.general_observations.forEach(pText => {
            const p = document.createElement('p');
            p.textContent = pText;
            observations.appendChild(p);
        });

        // Render Green Points (Section 3)
        const greenList = document.getElementById('green-points-list');
        greenList.innerHTML = '';
        overall.green_points.forEach(point => {
            const li = document.createElement('li');
            li.textContent = point;
            greenList.appendChild(li);
        });

        // Render Red Points (Section 4) & Image Uploaders
        const redList = document.getElementById('red-points-list');
        redList.innerHTML = '';
        overall.red_points.forEach(point => {
            const li = document.createElement('li');
            li.textContent = point;
            redList.appendChild(li);
        });

        // Overall Red Point Uploaders (if elements exist in HTML)
        const uploaderGrid = document.getElementById('overall-red-uploader');
        const printImagesGrid = document.getElementById('print-overall-red-images');
        if (uploaderGrid && printImagesGrid) {
            uploaderGrid.innerHTML = '';
            printImagesGrid.innerHTML = '';

            overall.red_points.forEach((point, idx) => {
                const storageKey = `lush_img_${activeWeekId}_overall_red_${idx}`;
                
                // Create Uploader Box
                const uploadBox = document.createElement('div');
                uploadBox.className = 'overall-upload-box';
                uploadBox.innerHTML = `
                    <div class="uploader-placeholder" id="ph-${storageKey}">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        <span>Ảnh ${idx + 1}</span>
                    </div>
                    <input type="file" accept="image/*" class="uploader-input" data-key="${storageKey}" data-title="Ảnh ${idx + 1}: ${point}">
                    <div class="uploader-preview" id="prev-${storageKey}">
                        <img src="" id="img-${storageKey}" alt="Minh chứng">
                        <button class="uploader-delete" data-key="${storageKey}">&times;</button>
                    </div>
                `;
                uploaderGrid.appendChild(uploadBox);
                
                // Handle image load if it exists in Supabase or local storage
                const savedImg = dbImages[storageKey] || localStorage.getItem(storageKey);
                if (savedImg) {
                    const imgEl = uploadBox.querySelector(`#img-${storageKey}`);
                    const prevEl = uploadBox.querySelector(`#prev-${storageKey}`);
                    const phEl = uploadBox.querySelector(`#ph-${storageKey}`);
                    
                    imgEl.src = savedImg;
                    prevEl.style.display = 'block';
                    phEl.style.display = 'none';
                    
                    // Print container
                    const printWrap = document.createElement('div');
                    printWrap.className = 'print-image-wrap';
                    printWrap.innerHTML = `
                        <img src="${savedImg}" alt="Minh chứng">
                        <span>Ảnh ${idx + 1}: Cần cải thiện</span>
                    `;
                    printImagesGrid.appendChild(printWrap);
                }
            });

            // Set up input events for Overall Uploaders
            uploaderGrid.querySelectorAll('.uploader-input').forEach(input => {
                input.addEventListener('change', (e) => {
                    handleImageUpload(e.target, () => loadWeekData(activeWeekId));
                });
            });

            uploaderGrid.querySelectorAll('.uploader-delete').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const key = btn.getAttribute('data-key');
                    deleteImage(key, () => loadWeekData(activeWeekId));
                });
            });

            // Setup image click to open lightbox
            uploaderGrid.querySelectorAll('.uploader-preview img').forEach(img => {
                img.addEventListener('click', () => {
                    const input = img.closest('.overall-upload-box').querySelector('.uploader-input');
                    const title = input.getAttribute('data-title');
                    openLightbox(img.src, title);
                });
            });
        }

        // Render Proposed Actions (Section 5)
        const proposedBody = document.getElementById('proposed-actions-body');
        proposedBody.innerHTML = '';
        overall.proposed_actions.forEach(act => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${act.issue}</strong></td>
                <td>${act.stores}</td>
                <td style="font-size: 13.5px;">${act.action}</td>
                <td class="text-center"><span class="badge ${act.priority === 'High' ? 'badge-poor' : 'badge-warn'}">${act.priority}</span></td>
            `;
            proposedBody.appendChild(tr);
        });

        // Render Follow-up (Section 6)
        const followBody = document.getElementById('follow-up-body');
        followBody.innerHTML = '';
        overall.follow_up.forEach(fup => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${fup.store}</strong></td>
                <td style="font-size: 13.5px;">${fup.focus}</td>
                <td style="font-size: 13.5px;">${fup.expected}</td>
            `;
            followBody.appendChild(tr);
        });
    }

    // 6. RENDER DYNAMIC STORE REPORT TAB
    function renderStoreReport(storeKey, store, weekName) {
        const container = document.getElementById(`tab-store-${storeKey}`);
        if (!container) return;
        
        container.innerHTML = `
            <!-- Store Name Title Section -->
            <div class="store-section-title">
                <h2>Báo cáo Store Visit: ${store.metadata.store}</h2>
            </div>
            
            <!-- Store Controls (Expand/Collapse all) -->
            <div class="store-controls no-print">
                <button class="btn btn-secondary btn-sm btn-expand-all" data-store="${storeKey}">Mở rộng tất cả</button>
                <button class="btn btn-secondary btn-sm btn-collapse-all" data-store="${storeKey}">Thu gọn tất cả</button>
            </div>

            <!-- Store Metadata Header -->
            <div class="store-meta-grid">
                <div class="meta-item">
                    <span class="label">Cửa Hàng</span>
                    <span class="value">${store.metadata.store}</span>
                </div>
                <div class="meta-item">
                    <span class="label">Ngày Đánh Giá</span>
                    <span class="value">${store.metadata.visitDate}</span>
                </div>
                <div class="meta-item">
                    <span class="label">Giờ Đánh Giá</span>
                    <span class="value">${store.metadata.visitTime}</span>
                </div>
                <div class="meta-item">
                    <span class="label">Nhân Sự Ca Trực</span>
                    <span class="value">${store.metadata.staffOnDuty} nhân sự</span>
                </div>
            </div>

            <!-- KPI Board Overview with Progress Bars -->
            <div class="grid grid-4 no-print" style="margin-bottom: 24px;">
                <div class="metric-card" style="padding: 14px;">
                    <div class="meta-item">
                        <span class="label">VMD SCORE</span>
                        <span class="value" style="font-size: 20px; font-family: var(--font-heading); margin-top: 4px;">${store.vm.total}/45 (${store.vm.grade})</span>
                        <div class="score-progress-wrapper">
                            <div class="score-progress-bar ${parseInt(store.vm.total) >= 40 ? 'good' : parseInt(store.vm.total) >= 34 ? 'warn' : 'poor'}" style="width: ${(parseInt(store.vm.total)/45*100).toFixed(0)}%;"></div>
                        </div>
                    </div>
                </div>
                <div class="metric-card" style="padding: 14px;">
                    <div class="meta-item">
                        <span class="label">STOREROOM SCORE</span>
                        <span class="value" style="font-size: 20px; font-family: var(--font-heading); margin-top: 4px;">${store.storeroom.total}/15 (${store.storeroom.grade})</span>
                        <div class="score-progress-wrapper">
                            <div class="score-progress-bar ${parseInt(store.storeroom.total) >= 14 ? 'good' : parseInt(store.storeroom.total) >= 11 ? 'warn' : 'poor'}" style="width: ${(parseInt(store.storeroom.total)/15*100).toFixed(0)}%;"></div>
                        </div>
                    </div>
                </div>
                <div class="metric-card" style="padding: 14px;">
                    <div class="meta-item">
                        <span class="label">TESTER SCORE</span>
                        <span class="value" style="font-size: 20px; font-family: var(--font-heading); margin-top: 4px;">${store.tester.total}/15 (${store.tester.grade})</span>
                        <div class="score-progress-wrapper">
                            <div class="score-progress-bar ${parseInt(store.tester.total) >= 14 ? 'good' : parseInt(store.tester.total) >= 11 ? 'warn' : 'poor'}" style="width: ${(parseInt(store.tester.total)/15*100).toFixed(0)}%;"></div>
                        </div>
                    </div>
                </div>
                <div class="metric-card" style="padding: 14px;">
                    <div class="meta-item">
                        <span class="label">STAFF SCORE</span>
                        <span class="value" style="font-size: 20px; font-family: var(--font-heading); margin-top: 4px;">${store.staff.total}/15 (${store.staff.grade})</span>
                        <div class="score-progress-wrapper">
                            <div class="score-progress-bar ${parseInt(store.staff.total) >= 14 ? 'good' : parseInt(store.staff.total) >= 11 ? 'warn' : 'poor'}" style="width: ${(parseInt(store.staff.total)/15*100).toFixed(0)}%;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ACCORDIONS -->
            <div class="accordion-container">
                <!-- 1. VISUAL MERCHANDISING -->
                <div class="accordion-item expanded" data-section="vm">
                    <div class="accordion-header">
                        <div class="accordion-title-area">
                            <h3>Visual Merchandising (VMD)</h3>
                            <span class="badge badge-good">VMD: ${store.vm.total}/45 Điểm (${store.vm.grade})</span>
                        </div>
                        <div class="accordion-score-summary">
                            <svg class="accordion-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    </div>
                    <div class="accordion-content">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style="width: 5%; text-align: center;">STT</th>
                                        <th style="width: 60%;">Tiêu Chí Đánh Giá Visual Merchandising</th>
                                        <th style="width: 10%; text-align: center;">Điểm Số</th>
                                        <th class="no-print" style="width: 25%; text-align: center;">Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${renderChecklistRows(storeKey, 'vm', store.vm.items)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- 2. STOREROOM -->
                <div class="accordion-item expanded" data-section="storeroom">
                    <div class="accordion-header">
                        <div class="accordion-title-area">
                            <h3>Kho Hàng (Storeroom)</h3>
                            <span class="badge badge-good">Kho: ${store.storeroom.total}/15 Điểm (${store.storeroom.grade})</span>
                        </div>
                        <div class="accordion-score-summary">
                            <svg class="accordion-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    </div>
                    <div class="accordion-content">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style="width: 5%; text-align: center;">STT</th>
                                        <th style="width: 60%;">Tiêu Chí Đánh Giá Kho Hàng</th>
                                        <th style="width: 10%; text-align: center;">Điểm Số</th>
                                        <th class="no-print" style="width: 25%; text-align: center;">Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${renderChecklistRows(storeKey, 'storeroom', store.storeroom.items)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- 3. TESTER -->
                <div class="accordion-item expanded" data-section="tester">
                    <div class="accordion-header">
                        <div class="accordion-title-area">
                            <h3>Quản Lý Tester</h3>
                            <span class="badge badge-good">Tester: ${store.tester.total}/15 Điểm (${store.tester.grade})</span>
                        </div>
                        <div class="accordion-score-summary">
                            <svg class="accordion-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    </div>
                    <div class="accordion-content">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style="width: 5%; text-align: center;">STT</th>
                                        <th style="width: 60%;">Tiêu Chí Đánh Giá Tester</th>
                                        <th style="width: 10%; text-align: center;">Điểm Số</th>
                                        <th class="no-print" style="width: 25%; text-align: center;">Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${renderChecklistRows(storeKey, 'tester', store.tester.items)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- 4. STAFF -->
                <div class="accordion-item expanded" data-section="staff">
                    <div class="accordion-header">
                        <div class="accordion-title-area">
                            <h3>Nhân Sự (Staff Grooming & Knowledge)</h3>
                            <span class="badge badge-good">Staff: ${store.staff.total}/15 Điểm (${store.staff.grade})</span>
                        </div>
                        <div class="accordion-score-summary">
                            <svg class="accordion-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    </div>
                    <div class="accordion-content">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style="width: 5%; text-align: center;">STT</th>
                                        <th style="width: 60%;">Tiêu Chí Đánh Giá Nhân Sự</th>
                                        <th style="width: 10%; text-align: center;">Điểm Số</th>
                                        <th class="no-print" style="width: 25%; text-align: center;">Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${renderChecklistRows(storeKey, 'staff', store.staff.items)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- 5. FINANCIAL RECONCILIATION -->
                <div class="accordion-item expanded" data-section="payment">
                    <div class="accordion-header">
                        <div class="accordion-title-area">
                            <h3>Tài Chính & Doanh Thu (Payment Check)</h3>
                        </div>
                        <div class="accordion-score-summary">
                            <svg class="accordion-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    </div>
                    <div class="accordion-content">
                        <h4 style="margin-bottom: 8px;">Reconciliation Logs</h4>
                        <div class="table-responsive" style="margin-bottom: 20px;">
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>Banking Date / Revenue Date</th>
                                        <th>Cash in POS / Cash in report</th>
                                        <th>Banking Cash / Cash in safe</th>
                                        <th>Discrepancy (Chênh lệch)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${renderPaymentRows(store.payment)}
                                </tbody>
                            </table>
                        </div>

                        <h4 style="margin-bottom: 8px;">Petty Cash Logs</h4>
                        <div class="table-responsive">
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>Checking Time</th>
                                        <th>Reserve Fund in System (Hệ thống)</th>
                                        <th>Reserve Cash in Cashier (Két két)</th>
                                        <th>Discrepancy (Chênh lệch)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${renderPettyCashRows(store.petty_cash)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- 6. RANDOM STOCK CHECK -->
                <div class="accordion-item expanded" data-section="stock">
                    <div class="accordion-header">
                        <div class="accordion-title-area">
                            <h3>Kiểm Kho Ngẫu Nhiên (Random Stock Check)</h3>
                            <span class="badge badge-good">Chênh Lệch: 0</span>
                        </div>
                        <div class="accordion-score-summary">
                            <svg class="accordion-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    </div>
                    <div class="accordion-content">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th style="width: 5%; text-align: center;">STT</th>
                                        <th style="width: 15%;">Mã Sản Phẩm</th>
                                        <th style="width: 40%;">Tên Sản Phẩm (LUSH)</th>
                                        <th style="width: 10%; text-align: center;">Hệ Thống</th>
                                        <th style="width: 10%; text-align: center;">Thực Tế</th>
                                        <th style="width: 10%; text-align: center;">Lệch (+/-)</th>
                                        <th>Nhận Xét</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${renderStockCheckRows(store.stock_check)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- 7. DETAILED REMARKS -->
                <div class="accordion-item expanded" data-section="remarks">
                    <div class="accordion-header">
                        <div class="accordion-title-area">
                            <h3>Đánh giá chi tiết</h3>
                        </div>
                        <div class="accordion-score-summary">
                            <svg class="accordion-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    </div>
                    <div class="accordion-content">
                        <div class="grid grid-2">
                            <div class="card green-card" style="padding: 16px; margin: 0;">
                                <h4 style="margin-bottom: 10px; color: var(--color-green);">Green Comments / Điểm Tốt</h4>
                                <p style="font-size: 13.5px; white-space: pre-line;">${store.comment.green || 'Chưa ghi nhận'}</p>
                            </div>
                            <div class="card red-card" style="padding: 16px; margin: 0;">
                                <h4 style="margin-bottom: 10px; color: var(--color-red);">Red Comments / Điểm Cải Thiện</h4>
                                <p style="font-size: 13.5px; white-space: pre-line;">${store.comment.red || 'Chưa ghi nhận'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Load images and bind local actions inside the rendered store tab panel
        bindUploaderEvents(storeKey);
    }

    // Helper: render checklist rows with score classes and image uploaders
    function renderChecklistRows(storeKey, section, items) {
        let html = '';
        items.forEach(item => {
            const scoreNum = parseInt(item.score);
            const isRed = scoreNum < 3;
            const trClass = isRed ? 'class="highlight-red"' : '';
            const storageKey = `lush_img_${activeWeekId}_${storeKey}_${section}_${item.id}`;
            let savedImg = dbImages[storageKey] || localStorage.getItem(storageKey);
            
            // Default image fallback if no user-uploaded image is present
            if (!savedImg && storeKey === 'SGCT' && section === 'vm' && item.id === 2) {
                savedImg = 'sgct_vm_2.jpg';
            }
            if (!savedImg && storeKey === 'SGCT' && section === 'vm' && item.id === 3) {
                savedImg = 'sgct_vm_3.jpg';
            }
            if (!savedImg && storeKey === 'SGCT' && section === 'storeroom' && item.id === 1) {
                savedImg = 'sgct_storeroom_1.jpg';
            }
            if (!savedImg && storeKey === 'SGCT' && section === 'tester' && item.id === 4) {
                savedImg = 'sgct_tester_4.jpg';
            }
            if (!savedImg && storeKey === 'SGCT' && section === 'tester' && item.id === 5) {
                savedImg = 'sgct_tester_5.jpg';
            }
            if (!savedImg && storeKey === 'VCDK' && section === 'vm' && item.id === 14) {
                savedImg = 'vcdk_vm_14.jpg';
            }
            
            let uploaderHtml = '';
            let printImgHtml = '';
            
            if (isRed) {
                uploaderHtml = `
                    <div class="uploader-container" id="container-${storageKey}">
                        <div class="uploader-placeholder" id="ph-${storageKey}" ${savedImg ? 'style="display:none;"' : ''}>
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            <span>Chèn ảnh</span>
                        </div>
                        <input type="file" accept="image/*" class="uploader-input store-uploader" data-key="${storageKey}" data-title="${storeKey} [${section.toUpperCase()}] Câu ${item.id}">
                        <div class="uploader-preview" id="prev-${storageKey}" ${savedImg ? 'style="display:block;"' : ''}>
                            <img src="${savedImg || ''}" id="img-${storageKey}" alt="Minh chứng">
                            <button class="uploader-delete store-delete" data-key="${storageKey}">&times;</button>
                        </div>
                    </div>
                `;
                
                if (savedImg) {
                    printImgHtml = `
                        <div class="print-images-container only-print" style="margin-top:6px;">
                            <div class="print-image-wrap">
                                <img src="${savedImg}" alt="Minh chứng">
                                <span>Ảnh câu ${item.id}</span>
                            </div>
                        </div>
                    `;
                }
            } else {
                uploaderHtml = `<span style="color:var(--color-gray-medium); font-size:11px;">Đạt Chuẩn</span>`;
            }
            
            html += `
                <tr ${trClass}>
                    <td class="text-center" style="font-weight:600;">${item.id}</td>
                    <td style="font-size: 13.5px;">
                        ${item.question}
                        ${printImgHtml}
                    </td>
                    <td class="text-center">
                        <span class="badge ${isRed ? 'badge-poor' : 'badge-good'}">${item.score}/3</span>
                    </td>
                    <td class="no-print uploader-cell">
                        ${uploaderHtml}
                    </td>
                </tr>
            `;
        });
        return html;
    }

    // Helper: render payment checks table rows
    function renderPaymentRows(payment) {
        if (!payment || payment.length === 0) return '<tr><td colspan="4">Không có dữ liệu</td></tr>';
        return payment.map(p => `
            <tr>
                <td><strong>${p.col0 || 'Doanh thu'}</strong></td>
                <td>${p.col1}</td>
                <td>${p.col2}</td>
                <td><span class="badge ${p.col3 !== '-' && p.col3 !== 'NA' && p.col3 !== ' - ' ? 'badge-warn' : 'badge-neutral'}">${p.col3}</span></td>
            </tr>
        `).join('');
    }

    // Helper: render petty cash table rows
    function renderPettyCashRows(pettyCash) {
        if (!pettyCash || pettyCash.length === 0) return '<tr><td colspan="4">Không có dữ liệu</td></tr>';
        return pettyCash.map(p => `
            <tr>
                <td><strong>${p.time}</strong></td>
                <td>${p.system}</td>
                <td>${p.cashier}</td>
                <td><span class="badge ${p.discrepancy !== '-' && p.discrepancy !== ' - ' ? 'badge-warn' : 'badge-neutral'}">${p.discrepancy}</span></td>
            </tr>
        `).join('');
    }

    // Helper: render stock checks rows
    function renderStockCheckRows(stockCheck) {
        if (!stockCheck || stockCheck.length === 0) return '<tr><td colspan="7">Không có dữ liệu</td></tr>';
        return stockCheck.map(p => `
            <tr>
                <td class="text-center">${p.id}</td>
                <td><code>${p.code}</code></td>
                <td>${p.name}</td>
                <td class="text-center">${p.system}</td>
                <td class="text-center">${p.actual}</td>
                <td class="text-center">
                    <span class="badge ${parseInt(p.gap) !== 0 ? 'badge-warn' : 'badge-good'}">${p.gap}</span>
                </td>
                <td><span style="font-size:12px; color:var(--color-gray-dark);">${p.remark || ''}</span></td>
            </tr>
        `).join('');
    }

    // 7. BIND INTERACTIVE ACCORDION EVENT HANDLERS
    function bindAccordionListeners() {
        const headers = document.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            // Remove existing listener to prevent duplicate triggers
            const newHeader = header.cloneNode(true);
            header.parentNode.replaceChild(newHeader, header);
            
            newHeader.addEventListener('click', () => {
                const item = newHeader.closest('.accordion-item');
                item.classList.toggle('expanded');
            });
        });
    }

    // 8. BIND FILE UPLOADERS IN STORE REPORT
    function bindUploaderEvents(storeKey) {
        const panel = document.getElementById(`tab-store-${storeKey}`);
        if (!panel) return;

        // Image Selection Trigger
        panel.querySelectorAll('.store-uploader').forEach(input => {
            input.addEventListener('change', (e) => {
                handleImageUpload(e.target, () => {
                    // Refresh data layout
                    loadWeekData(activeWeekId);
                });
            });
        });

        // Image Delete Trigger
        panel.querySelectorAll('.store-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const key = btn.getAttribute('data-key');
                deleteImage(key, () => {
                    loadWeekData(activeWeekId);
                });
            });
        });

        // Lightbox Trigger
        panel.querySelectorAll('.uploader-preview img').forEach(img => {
            img.addEventListener('click', () => {
                const input = img.closest('.uploader-container').querySelector('.uploader-input');
                const title = input.getAttribute('data-title');
                openLightbox(img.src, title);
            });
        });

        // Static Image Lightbox Trigger
        panel.querySelectorAll('.zoomable-static-img').forEach(img => {
            img.addEventListener('click', () => {
                const title = img.getAttribute('data-title') || 'Minh chứng';
                openLightbox(img.src, title);
            });
        });

        // Accordion Expand/Collapse All Triggers
        const btnExpand = panel.querySelector('.btn-expand-all');
        const btnCollapse = panel.querySelector('.btn-collapse-all');
        if (btnExpand) {
            btnExpand.addEventListener('click', () => {
                panel.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.add('expanded');
                });
            });
        }
        if (btnCollapse) {
            btnCollapse.addEventListener('click', () => {
                panel.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.remove('expanded');
                });
            });
        }
    }

    // Helper to read file as base64 blob
    function readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
        });
    }

    // Helper to compress image file to blob
    function compressImageFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const maxSize = 800;
                    
                    if (width > maxSize || height > maxSize) {
                        if (width > height) {
                            height = Math.round((height * maxSize) / width);
                            width = maxSize;
                        } else {
                            width = Math.round((width * maxSize) / height);
                            height = maxSize;
                        }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Canvas compression failed'));
                        }
                    }, 'image/jpeg', 0.7);
                };
                img.src = event.target.result;
            };
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
        });
    }

    // Upload blob to Cloudinary via unsigned preset
    async function uploadToCloudinary(blob) {
        const formData = new FormData();
        formData.append('file', blob);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Lỗi tải ảnh lên Cloudinary. Vui lòng kiểm tra lại Cloud Name và Preset.');
        }
        const data = await response.json();
        return data.secure_url;
    }

    // Save image URL to Supabase
    async function saveImageToSupabase(weekId, storeKey, section, itemId, imageUrl) {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/store_images`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates'
            },
            body: JSON.stringify({
                week_id: weekId,
                store_key: storeKey,
                section: section,
                item_id: parseInt(itemId),
                image_url: imageUrl
            })
        });

        if (!response.ok) {
            throw new Error('Lỗi lưu URL ảnh vào Supabase.');
        }
    }

    // Fetch images from Supabase for current week
    async function loadImagesFromSupabase(weekId) {
        if (SUPABASE_ANON_KEY === 'YOUR_ANON_KEY') {
            return {};
        }
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/store_images?week_id=eq.${weekId}`, {
                method: 'GET',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                }
            });

            if (!response.ok) {
                console.warn('Không thể kết nối Supabase, sử dụng localStorage.');
                return {};
            }
            
            const data = await response.json();
            const imagesMap = {};
            data.forEach(img => {
                const key = `lush_img_${img.week_id}_${img.store_key}_${img.section}_${img.item_id}`;
                imagesMap[key] = img.image_url;
            });
            return imagesMap;
        } catch (e) {
            console.warn('Lỗi khi tải dữ liệu ảnh từ Supabase:', e);
            return {};
        }
    }

    // 9. IMAGE UPLOAD & LOCAL STORAGE INTEGRATION WITH CANVAS COMPRESSION & CLOUDINARY/SUPABASE
    async function handleImageUpload(inputEl, callback) {
        const file = inputEl.files[0];
        if (!file) return;

        // Limit size to 10MB to accommodate mobile camera photos
        if (file.size > 10 * 1024 * 1024) {
            alert('Hình ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 10MB.');
            inputEl.value = '';
            return;
        }

        const storageKey = inputEl.getAttribute('data-key');
        
        // Show loading status
        const uploaderContainer = inputEl.closest('.uploader-container') || inputEl.closest('.overall-upload-box');
        let originalContent = '';
        if (uploaderContainer) {
            originalContent = uploaderContainer.innerHTML;
            uploaderContainer.innerHTML = '<span style="font-size:10px;color:var(--color-gray-dark);font-weight:600;">LOADING...</span>';
        }

        try {
            // 1. Compress image
            const compressedFile = await compressImageFile(file);
            
            // 2. Upload to Cloudinary if configured
            let imageUrl = '';
            if (CLOUDINARY_CLOUD_NAME !== 'YOUR_CLOUD_NAME' && CLOUDINARY_UPLOAD_PRESET !== 'YOUR_UPLOAD_PRESET') {
                imageUrl = await uploadToCloudinary(compressedFile);
            } else {
                // Fallback to local Base64
                const base64Data = await readFileAsBase64(compressedFile);
                localStorage.setItem(storageKey, base64Data);
                if (callback) callback();
                return;
            }
            
            // 3. Save to Supabase if configured
            if (SUPABASE_ANON_KEY !== 'YOUR_ANON_KEY') {
                const parts = storageKey.split('_');
                // Parts: lush, img, 2026-W27, [storeKey or overall], [section or red], itemId
                const weekId = parts[2];
                const storeKey = parts[3];
                const section = parts[4];
                const itemId = parts[5];
                
                await saveImageToSupabase(weekId, storeKey, section, itemId, imageUrl);
            } else {
                localStorage.setItem(storageKey, imageUrl);
            }
            
            if (callback) callback();
        } catch (err) {
            console.error(err);
            alert('Lỗi tải ảnh lên: ' + err.message);
            if (uploaderContainer) {
                uploaderContainer.innerHTML = originalContent;
            }
            await loadWeekData(activeWeekId);
        }
    }

    async function deleteImage(storageKey, callback) {
        localStorage.removeItem(storageKey);
        
        if (SUPABASE_ANON_KEY !== 'YOUR_ANON_KEY') {
            try {
                const parts = storageKey.split('_');
                const weekId = parts[2];
                const storeKey = parts[3];
                const section = parts[4];
                const itemId = parts[5];
                
                await fetch(`${SUPABASE_URL}/rest/v1/store_images?week_id=eq.${weekId}&store_key=eq.${storeKey}&section=eq.${section}&item_id=eq.${itemId}`, {
                    method: 'DELETE',
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                    }
                });
            } catch (e) {
                console.error("Lỗi khi xóa ảnh trên Supabase:", e);
            }
        }
        
        if (callback) callback();
    }

    async function clearAllWeekImages() {
        let count = 0;
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(`lush_img_${activeWeekId}`) || key.startsWith(`lush_report_img_${activeWeekId}`)) {
                localStorage.removeItem(key);
                count++;
            }
        });
        
        if (SUPABASE_ANON_KEY !== 'YOUR_ANON_KEY') {
            try {
                await fetch(`${SUPABASE_URL}/rest/v1/store_images?week_id=eq.${activeWeekId}`, {
                    method: 'DELETE',
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                    }
                });
            } catch (e) {
                console.error("Lỗi khi xóa sạch ảnh trên Supabase:", e);
            }
        }
        
        alert(`Đã xóa sạch thành công ${count} ảnh minh chứng của tuần này.`);
        await loadWeekData(activeWeekId);
    }

    // 10. LIGHTBOX VIEW WINDOW HANDLERS
    function openLightbox(src, title) {
        lightboxImg.src = src;
        lightboxCaption.textContent = title || 'Minh chứng cải thiện';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxCaption.textContent = '';
        }, 300);
    }

    // RUN THE APPLICATION
    init();
});
