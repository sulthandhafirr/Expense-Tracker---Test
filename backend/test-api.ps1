# API Testing Script for Expense Tracker
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  EXPENSE TRACKER - API TESTING" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:5000"
$randomNum = Get-Random -Maximum 99999

# Test 1: Register
Write-Host "[1/7] REGISTER USER" -ForegroundColor Yellow
try {
    $registerBody = @{
        name = "Test User"
        email = "testuser$randomNum@example.com"
        password = "Password123"
    } | ConvertTo-Json

    $registerResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/register" -Method Post -Body $registerBody -ContentType "application/json"
    
    Write-Host "✓ SUCCESS" -ForegroundColor Green
    Write-Host "  Name: $($registerResponse.data.name)"
    Write-Host "  Email: $($registerResponse.data.email)"
    Write-Host "  ID: $($registerResponse.data.id)"
    
    $token = $registerResponse.data.token
    $email = $registerResponse.data.email
    Write-Host ""
    
} catch {
    Write-Host "✗ FAILED" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)"
    if ($_.ErrorDetails.Message) {
        Write-Host "  Details: $($_.ErrorDetails.Message)"
    }
    exit 1
}

# Test 2: Login
Write-Host "[2/7] LOGIN USER" -ForegroundColor Yellow
try {
    $loginBody = @{
        email = $email
        password = "Password123"
    } | ConvertTo-Json

    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
    
    Write-Host "✓ SUCCESS" -ForegroundColor Green
    Write-Host "  User: $($loginResponse.data.name)"
    Write-Host "  Token received: YES"
    
    $token = $loginResponse.data.token
    Write-Host ""
    
} catch {
    Write-Host "✗ FAILED" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)"
    exit 1
}

# Test 3: Get Profile
Write-Host "[3/7] GET USER PROFILE" -ForegroundColor Yellow
try {
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }

    $profileResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/me" -Method Get -Headers $headers
    
    Write-Host "✓ SUCCESS" -ForegroundColor Green
    Write-Host "  Name: $($profileResponse.data.name)"
    Write-Host "  Email: $($profileResponse.data.email)"
    Write-Host ""
    
} catch {
    Write-Host "✗ FAILED" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)"
}

# Test 4: Create Expense
Write-Host "[4/7] CREATE EXPENSE" -ForegroundColor Yellow
try {
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }

    $expenseBody = @{
        title = "Test Expense"
        amount = 50000
        category = "Food"
        date = Get-Date -Format "yyyy-MM-dd"
        description = "Lunch with team"
    } | ConvertTo-Json

    $createResponse = Invoke-RestMethod -Uri "$baseUrl/api/expenses" -Method Post -Headers $headers -Body $expenseBody
    
    Write-Host "✓ SUCCESS" -ForegroundColor Green
    Write-Host "  Title: $($createResponse.data.title)"
    Write-Host "  Amount: Rp $($createResponse.data.amount)"
    Write-Host "  Category: $($createResponse.data.category)"
    Write-Host "  ID: $($createResponse.data._id)"
    
    $expenseId = $createResponse.data._id
    Write-Host ""
    
} catch {
    Write-Host "✗ FAILED" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)"
    if ($_.ErrorDetails.Message) {
        Write-Host "  Details: $($_.ErrorDetails.Message)"
    }
}

# Test 5: Get All Expenses
Write-Host "[5/7] GET ALL EXPENSES" -ForegroundColor Yellow
try {
    $headers = @{
        "Authorization" = "Bearer $token"
    }

    $expensesResponse = Invoke-RestMethod -Uri "$baseUrl/api/expenses" -Method Get -Headers $headers
    
    Write-Host "✓ SUCCESS" -ForegroundColor Green
    Write-Host "  Total expenses: $($expensesResponse.count)"
    if ($expensesResponse.data) {
        Write-Host "  Latest: $($expensesResponse.data[0].title) - Rp $($expensesResponse.data[0].amount)"
    }
    Write-Host ""
    
} catch {
    Write-Host "✗ FAILED" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)"
}

# Test 6: Update Expense
if ($expenseId) {
    Write-Host "[6/7] UPDATE EXPENSE" -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $token"
            "Content-Type" = "application/json"
        }

        $updateBody = @{
            title = "Updated Expense"
            amount = 75000
            category = "Food"
            description = "Updated description"
        } | ConvertTo-Json

        $updateResponse = Invoke-RestMethod -Uri "$baseUrl/api/expenses/$expenseId" -Method Put -Headers $headers -Body $updateBody
        
        Write-Host "✓ SUCCESS" -ForegroundColor Green
        Write-Host "  New title: $($updateResponse.data.title)"
        Write-Host "  New amount: Rp $($updateResponse.data.amount)"
        Write-Host ""
        
    } catch {
        Write-Host "✗ FAILED" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)"
    }
}

# Test 7: Delete Expense
if ($expenseId) {
    Write-Host "[7/7] DELETE EXPENSE" -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $token"
        }

        $deleteResponse = Invoke-RestMethod -Uri "$baseUrl/api/expenses/$expenseId" -Method Delete -Headers $headers
        
        Write-Host "✓ SUCCESS" -ForegroundColor Green
        Write-Host "  Expense deleted successfully"
        Write-Host ""
        
    } catch {
        Write-Host "✗ FAILED" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)"
    }
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TESTING COMPLETE!" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
