# PowerShell script to fetch Top 1000 Real Global Universities from OpenAlex API
# Strict compliance: Real data only, no fabricated rankings, no VN schools.
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$ErrorActionPreference = "Stop"

Write-Host "=========================================================="
Write-Host "   NS AI: FETCHING TOP 1000 REAL UNIVERSITIES VIA OPENALEX "
Write-Host "=========================================================="

# Continent dictionary by ISO country code
$continentMap = @{
    # North & South America
    "US" = "Châu Mỹ"; "CA" = "Châu Mỹ"; "MX" = "Châu Mỹ"; "BR" = "Châu Mỹ"; "AR" = "Châu Mỹ";
    "CL" = "Châu Mỹ"; "CO" = "Châu Mỹ"; "PE" = "Châu Mỹ"; "UY" = "Châu Mỹ"; "EC" = "Châu Mỹ";
    "CR" = "Châu Mỹ"; "CU" = "Châu Mỹ"; "PR" = "Châu Mỹ"; "PA" = "Châu Mỹ";
    # Europe
    "GB" = "Châu Âu"; "DE" = "Châu Âu"; "FR" = "Châu Âu"; "IT" = "Châu Âu"; "ES" = "Châu Âu";
    "NL" = "Châu Âu"; "CH" = "Châu Âu"; "SE" = "Châu Âu"; "NO" = "Châu Âu"; "DK" = "Châu Âu";
    "FI" = "Châu Âu"; "BE" = "Châu Âu"; "AT" = "Châu Âu"; "PL" = "Châu Âu"; "IE" = "Châu Âu";
    "CZ" = "Châu Âu"; "PT" = "Châu Âu"; "RU" = "Châu Âu"; "UA" = "Châu Âu"; "GR" = "Châu Âu";
    "HU" = "Châu Âu"; "RO" = "Châu Âu"; "TR" = "Châu Âu"; "IS" = "Châu Âu"; "EE" = "Châu Âu";
    "LT" = "Châu Âu"; "LV" = "Châu Âu"; "SI" = "Châu Âu"; "SK" = "Châu Âu"; "HR" = "Châu Âu";
    "RS" = "Châu Âu"; "BG" = "Châu Âu"; "LU" = "Châu Âu"; "CY" = "Châu Âu"; "MT" = "Châu Âu";
    # Asia
    "CN" = "Châu Á"; "JP" = "Châu Á"; "KR" = "Châu Á"; "SG" = "Châu Á"; "IN" = "Châu Á";
    "TW" = "Châu Á"; "HK" = "Châu Á"; "IL" = "Châu Á"; "SA" = "Châu Á"; "IR" = "Châu Á";
    "MY" = "Châu Á"; "TH" = "Châu Á"; "ID" = "Châu Á"; "PH" = "Châu Á"; "PK" = "Châu Á";
    "AE" = "Châu Á"; "QA" = "Châu Á"; "LB" = "Châu Á"; "JO" = "Châu Á"; "KZ" = "Châu Á";
    "OM" = "Châu Á"; "KW" = "Châu Á"; "BD" = "Châu Á"; "LK" = "Châu Á"; "MO" = "Châu Á";
    # Oceania / Australia
    "AU" = "Châu Úc"; "NZ" = "Châu Úc"; "FJ" = "Châu Úc"; "PG" = "Châu Úc";
    # Africa
    "ZA" = "Châu Phi"; "EG" = "Châu Phi"; "NG" = "Châu Phi"; "KE" = "Châu Phi"; "GH" = "Châu Phi";
    "MA" = "Châu Phi"; "ET" = "Châu Phi"; "UG" = "Châu Phi"; "TZ" = "Châu Phi"; "TN" = "Châu Phi";
    "DZ" = "Châu Phi"
}

# Country name dictionary in Vietnamese
$countryNameMap = @{
    "US" = "Mỹ"; "GB" = "Vương quốc Anh"; "CA" = "Canada"; "AU" = "Úc"; "DE" = "Đức";
    "FR" = "Pháp"; "CH" = "Thụy Sĩ"; "JP" = "Nhật Bản"; "CN" = "Trung Quốc"; "SG" = "Singapore";
    "KR" = "Hàn Quốc"; "NL" = "Hà Lan"; "SE" = "Thụy Điển"; "IT" = "Ý"; "ES" = "Tây Ban Nha";
    "RU" = "Nga"; "IN" = "Ấn Độ"; "BR" = "Brazil"; "IL" = "Israel"; "NZ" = "New Zealand";
    "BE" = "Bỉ"; "DK" = "Đan Mạch"; "NO" = "Na Uy"; "FI" = "Phần Lan"; "AT" = "Áo";
    "IE" = "Ireland"; "HK" = "Hồng Kông (TQ)"; "TW" = "Đài Loan"; "MY" = "Malaysia"; "TH" = "Thái Lan";
    "ID" = "Indonesia"; "PH" = "Philippines"; "SA" = "Ả Rập Xê Út"; "ZA" = "Nam Phi"; "MX" = "Mexico";
    "TR" = "Thổ Nhĩ Kỳ"; "PL" = "Ba Lan"; "CZ" = "Cộng hòa Séc"; "PT" = "Bồ Đào Nha"; "GR" = "Hy Lạp";
    "HU" = "Hungary"; "CL" = "Chile"; "AR" = "Argentina"; "CO" = "Colombia"; "EG" = "Ai Cập";
    "IR" = "Iran"; "PK" = "Pakistan"; "AE" = "UAE"; "QA" = "Qatar"; "RO" = "Romania";
    "UA" = "Ukraine"; "IS" = "Iceland"; "LU" = "Luxembourg"; "SI" = "Slovenia"; "SK" = "Slovakia"
}

# Academic Field translation map
$fieldTranslation = @{
    "Computer Science" = "Khoa học máy tính"
    "Medicine" = "Y khoa"
    "Physics and Astronomy" = "Vật lý & Thiên văn học"
    "Engineering" = "Kỹ thuật công nghệ"
    "Biochemistry, Genetics and Molecular Biology" = "Hóa sinh & Di truyền học"
    "Social Sciences" = "Khoa học xã hội"
    "Mathematics" = "Toán học"
    "Business, Management and Accounting" = "Kinh doanh & Quản lý"
    "Economics, Econometrics and Finance" = "Kinh tế & Tài chính"
    "Chemistry" = "Hóa học"
    "Environmental Science" = "Khoa học môi trường"
    "Materials Science" = "Khoa học vật liệu"
    "Psychology" = "Tâm lý học"
    "Arts and Humanities" = "Nghệ thuật & Nhân văn"
    "Agricultural and Biological Sciences" = "Nông nghiệp & Sinh học"
    "Immunology and Microbiology" = "Miễn dịch & Vi sinh vật"
    "Neuroscience" = "Khoa học thần kinh"
    "Earth and Planetary Sciences" = "Khoa học trái đất & địa chất"
    "Chemical Engineering" = "Kỹ thuật hóa học"
    "Energy" = "Năng lượng & Nhiên liệu"
    "Decision Sciences" = "Khoa học ra quyết định"
    "Dentistry" = "Nha khoa"
    "Veterinary" = "Thú y"
    "Nursing" = "Điều dưỡng & Chăm sóc sức khỏe"
    "Health Professions" = "Chuyên ngành y tế ứng dụng"
    "Pharmacology, Toxicology and Pharmaceutics" = "Dược học & Độc chất học"
}

$rawInstitutions = @()
$seenIds = @{}
$seenNames = @{}

# Fetch up to 6 pages (200 records each = 1200 records) to guarantee exactly 1000 unique records
$page = 1
$maxPages = 6
$headers = @{
    "User-Agent" = "NS_AI_Platform/2.0 (mailto:ns_ai_edu@example.com)"
}

while ($page -le $maxPages -and $rawInstitutions.Count -lt 1000) {
    $url = "https://api.openalex.org/institutions?filter=type:education,country_code:!VN&sort=cited_by_count:desc&per-page=200&page=$page"
    Write-Host "Fetching page $page from OpenAlex API..."
    
    try {
        $response = Invoke-RestMethod -Uri $url -Headers $headers -TimeoutSec 30
    } catch {
        Write-Error "DỪNG LẠI VÀ BÁO LỖI THẬT: Không thể kết nối tới OpenAlex API: $_"
        exit 1
    }

    if (-not $response -or -not $response.results -or $response.results.Count -eq 0) {
        Write-Host "No more results returned at page $page."
        break
    }

    foreach ($item in $response.results) {
        # Rule check: Absolute exclusion of Vietnam
        if ($item.country_code -eq "VN") {
            continue
        }

        # Rule check: Must have a display_name
        $name = ($item.display_name).Trim()
        if ([string]::IsNullOrWhiteSpace($name)) {
            continue
        }

        # Deduplication check by OpenAlex ID
        if ($seenIds.ContainsKey($item.id)) {
            continue
        }

        # Deduplication check by normalized name
        $normName = $name.ToLowerInvariant()
        if ($seenNames.ContainsKey($normName)) {
            continue
        }

        $seenIds[$item.id] = $true
        $seenNames[$normName] = $true
        $rawInstitutions += $item

        if ($rawInstitutions.Count -ge 1000) {
            break
        }
    }

    Write-Host "Collected $($rawInstitutions.Count) institutions so far."
    $page++
    Start-Sleep -Milliseconds 250
}

if ($rawInstitutions.Count -lt 1000) {
    Write-Error "DỪNG LẠI VÀ BÁO LỖI THẬT: Chỉ thu thập được $($rawInstitutions.Count) trường, không đủ 1000 trường."
    exit 1
}

# Ensure exactly 1000 institutions sorted by cited_by_count descending
$sortedInstitutions = $rawInstitutions | Select-Object -First 1000 | Sort-Object -Property cited_by_count -Descending

Write-Host "Mapping fields strictly according to existing schema..."

$outputSchools = @()
$rankIndex = 1

foreach ($inst in $sortedInstitutions) {
    $cCode = if ($inst.country_code) { ($inst.country_code).ToString().ToUpper() } else { "" }
    
    # Continent mapping
    $continent = if ($cCode -and $continentMap.ContainsKey($cCode)) {
        $continentMap[$cCode]
    } else {
        "Quốc tế"
    }

    # Country mapping
    $country = if ($cCode -and $countryNameMap.ContainsKey($cCode)) {
        $countryNameMap[$cCode]
    } elseif ($inst.geo -and $inst.geo.country) {
        $inst.geo.country
    } else {
        "Quốc tế"
    }

    # City mapping
    $city = if ($inst.geo -and $inst.geo.city) {
        $inst.geo.city
    } else {
        ""
    }

    # Strengths mapping from real topics/fields in OpenAlex API
    $strengthsList = @()
    if ($inst.topics -and $inst.topics.Count -gt 0) {
        foreach ($t in $inst.topics) {
            if ($t.field -and $t.field.display_name) {
                $rawField = $t.field.display_name
                $vnField = if ($fieldTranslation.ContainsKey($rawField)) { $fieldTranslation[$rawField] } else { $rawField }
                if (-not $strengthsList.Contains($vnField)) {
                    $strengthsList += $vnField
                }
            }
            if ($strengthsList.Count -ge 4) { break }
        }
    }
    if ($strengthsList.Count -eq 0) {
        $strengthsList = @("Nghiên cứu khoa học", "Đào tạo đại học & sau đại học")
    }

    # Website mapping (keep real homepage_url)
    $website = if ($inst.homepage_url) { $inst.homepage_url } else { "" }
    $ror = if ($inst.ror) { $inst.ror } else { "" }

    $padId = "global_" + ($rankIndex.ToString("D3"))

    $schoolObj = [ordered]@{
        id = $padId
        rank = $rankIndex
        ranking_source = "OpenAlex Citation Rank"
        name = $inst.display_name.Trim()
        continent = $continent
        country = $country
        country_code = $cCode
        city = $city
        strengths = $strengthsList
        requirements = "Đang cập nhật theo website trường"
        scholarship_info = "Đang cập nhật theo website trường"
        website = $website
        ror = $ror
        cited_by_count = [int64]$inst.cited_by_count
    }

    $outputSchools += $schoolObj
    $rankIndex++
}

# Convert to JSON with indentation
$jsonOutput = $outputSchools | ConvertTo-Json -Depth 5

# Target paths
$targetPaths = @(
    "C:\Users\kn900\OneDrive\Desktop\khkt\khkt\HTML\data\schools_global_top1000.json",
    "C:\Users\kn900\OneDrive\Desktop\khkt\khkt\JS\data\schools_global_top1000.json"
)

foreach ($tp in $targetPaths) {
    $parentDir = Split-Path -Parent $tp
    if (-not (Test-Path $parentDir)) {
        New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
    }
    # Save UTF-8 without BOM
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($tp, $jsonOutput, $utf8NoBom)
    Write-Host "Successfully written $tp ($([System.IO.FileInfo]::new($tp).Length) bytes)"
}

Write-Host "=========================================================="
Write-Host "                KIỂM CHỨNG BẮT BUỘC                       "
Write-Host "=========================================================="

# 1. Total count check
$totalCount = $outputSchools.Count
Write-Host "1. Tổng số trường: $totalCount (Yêu cầu: đúng 1000)"

# 2. Duplicate names & country_code = VN check
$duplicateNames = $outputSchools | Group-Object { $_.name.ToLowerInvariant() } | Where-Object { $_.Count -gt 1 }
$vnCount = ($outputSchools | Where-Object { $_.country_code -eq "VN" }).Count
Write-Host "2. Số tên trường bị trùng lặp: $($duplicateNames.Count) (Yêu cầu: 0)"
Write-Host "   Số trường có country_code = 'VN': $vnCount (Yêu cầu: 0)"

# 3. Real identifier ratio (ROR or real website)
$withIdentifier = ($outputSchools | Where-Object { -not [string]::IsNullOrWhiteSpace($_.ror) -or -not [string]::IsNullOrWhiteSpace($_.website) }).Count
$ratio = [math]::Round(($withIdentifier / $totalCount) * 100, 2)
Write-Host "3. Tỷ lệ trường có mã định danh thật (ROR hoặc Website): $ratio% ($withIdentifier / $totalCount)"

# 4. Print sample comparisons: 1-10, 495-505, 991-1000
Write-Host "`n--- MẪU ĐỐI CHIẾU: RANK 1 - 10 ---"
for ($i = 0; $i -lt 10; $i++) {
    $s = $outputSchools[$i]
    Write-Host ("#{0,4} | {1,-45} | {2,-12} | Cited: {3,10} | Web: {4} | ROR: {5}" -f $s.rank, $s.name, $s.country, $s.cited_by_count, $s.website, $s.ror)
}

Write-Host "`n--- MẪU ĐỐI CHIẾU: RANK 495 - 505 ---"
for ($i = 494; $i -lt 505; $i++) {
    $s = $outputSchools[$i]
    Write-Host ("#{0,4} | {1,-45} | {2,-12} | Cited: {3,10} | Web: {4} | ROR: {5}" -f $s.rank, $s.name, $s.country, $s.cited_by_count, $s.website, $s.ror)
}

Write-Host "`n--- MẪU ĐỐI CHIẾU: RANK 991 - 1000 ---"
for ($i = 990; $i -lt 1000; $i++) {
    $s = $outputSchools[$i]
    Write-Host ("#{0,4} | {1,-45} | {2,-12} | Cited: {3,10} | Web: {4} | ROR: {5}" -f $s.rank, $s.name, $s.country, $s.cited_by_count, $s.website, $s.ror)
}
Write-Host "=========================================================="
